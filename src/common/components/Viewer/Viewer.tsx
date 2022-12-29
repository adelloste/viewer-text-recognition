import React, { useCallback, useEffect, useState } from 'react';
import OpenSeadragon from 'openseadragon';
import 'openseadragon-fabricjs-overlay';
import { fabric } from 'fabric';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import NavigatorOverlay from './NavigatorOverlay';
import { flattenSegmentation, segmentation } from '../../utils/segmentation';
import { Resource } from '../../../app/definitions/types';

type Props = {
  resource: Resource;
  handleDeleteAnnotation: (id: string) => void;
  handleUpdateSegmentations: (id: string, data: number[]) => void;
};

const Viewer = ({ resource, handleDeleteAnnotation, handleUpdateSegmentations }: Props) => {
  const [overlay, setOverlay] = useState<any | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    target: fabric.Polygon;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  // define a function that can locate the controls.
  // this function will be used both for drawing and for interaction.
  const polygonPositionHandler = (pointIndex: number) => {
    return function (dim: fabric.Point, finalMatrix: any, fabricObject: any /* fabric.Polygon */) {
      const x = fabricObject.points[pointIndex].x - fabricObject.pathOffset.x;
      const y = fabricObject.points[pointIndex].y - fabricObject.pathOffset.y;

      return fabric.util.transformPoint(
        new fabric.Point(x, y),
        fabric.util.multiplyTransformMatrices(
          fabricObject.getViewportTransform(),
          fabricObject.calcTransformMatrix()
        )
      );
    };
  };

  const getObjectSizeWithStroke = (object: any /* fabric.Polygon */) => {
    const stroke = new fabric.Point(
      object.strokeUniform ? 1 / object.scaleX : 1,
      object.strokeUniform ? 1 / object.scaleY : 1
    ).multiply(object.strokeWidth);
    return new fabric.Point(object.width + stroke.x, object.height + stroke.y);
  };

  // define a function that will define what the control does
  // this function will be called on every mouse move after a control has been
  // clicked and is being dragged.
  // The function receive as argument the mouse event, the current trasnform object
  // and the current position in canvas coordinate
  // transform.target is a reference to the current object being transformed,
  const actionHandler = useCallback(
    (
      eventData: MouseEvent,
      transform: fabric.Transform,
      x: number,
      y: number,
      pointIndex: number
    ) => {
      const polygon: any = transform.target; // as fabric.Polygon;
      const mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center');
      const polygonBaseSize = getObjectSizeWithStroke(polygon);
      const size = polygon._getTransformedDimensions(0, 0);
      const finalPointPosition = new fabric.Point(
        (mouseLocalPosition.x * polygonBaseSize.x) / size.x + polygon.pathOffset.x,
        (mouseLocalPosition.y * polygonBaseSize.y) / size.y + polygon.pathOffset.y
      );
      polygon.points[pointIndex] = finalPointPosition;
      return true;
    },
    []
  );

  // define a function that can keep the polygon in the same position when we change its
  // width/height/top/left.
  const anchorWrapper = useCallback(
    (anchorIndex: number, fn: typeof actionHandler, pointIndex: number) => {
      return function (eventData: MouseEvent, transform: fabric.Transform, x: number, y: number) {
        const fabricObject: any = transform.target;
        const absolutePoint = fabric.util.transformPoint(
          new fabric.Point(
            fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
            fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y
          ),
          fabricObject.calcTransformMatrix()
        );
        const actionPerformed = fn(eventData, transform, x, y, pointIndex);
        const newDim = fabricObject._setPositionDimensions({});
        const polygonBaseSize = getObjectSizeWithStroke(fabricObject);
        const newX =
          (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x;
        const newY =
          (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        //
        handleUpdateSegmentations(
          fabricObject.data.id,
          flattenSegmentation(fabricObject.get('points'))
        );
        return actionPerformed;
      };
    },
    [handleUpdateSegmentations]
  );

  // Fabric.js demos · Custom controls, polygon
  // http://fabricjs.com/custom-controls-polygon
  const enableEditMode = useCallback(
    (poly: fabric.Polygon) => {
      if (poly.points) {
        // get last point
        const lastControl = poly.points.length - 1;
        // update controls
        poly.controls = poly.points.reduce(
          (acc: Record<string, fabric.Control>, point: fabric.Point, index: number) => {
            acc['p' + index] = new fabric.Control({
              positionHandler: polygonPositionHandler(index),
              actionHandler: anchorWrapper(
                index > 0 ? index - 1 : lastControl,
                actionHandler,
                index
              )
            });
            return acc;
          },
          {}
        );
      }
    },
    [actionHandler, anchorWrapper]
  );

  const handleClose = () => {
    setContextMenu(null);
  };

  const deleteAnnotation = () => {
    if (contextMenu) {
      const canvas = overlay.fabricCanvas();
      canvas.remove(contextMenu.target);
      // delete annotation by id
      handleDeleteAnnotation(contextMenu.target.data.id);
    }
    setContextMenu(null);
  };

  useEffect(() => {
    const viewer = OpenSeadragon({
      id: 'osd-viewer',
      debugMode: false,
      zoomInButton: 'osd-zoom-in',
      zoomOutButton: 'osd-zoom-out',
      homeButton: 'osd-home',
      fullPageButton: 'osd-fulls',
      tileSources: {
        type: 'image',
        url: resource.images[0].file_path,
        buildPyramid: false,
        width: resource.images[0].width,
        height: resource.images[0].height
      },
      gestureSettingsMouse: {
        clickToZoom: false
      }
    });
    // raised when an item is added to the World
    viewer.world.addHandler('add-item', addItemEvent => {
      const tiledImage = addItemEvent.item;
      // raised when the tiledImage is fully loaded
      tiledImage.addHandler('fully-loaded-change', () => {
        // Initialize overlay
        const overlay = viewer.fabricjsOverlay<fabric.Canvas>({
          scale: resource.images[0].width // Maybe should we have one image?
        });
        setOverlay(overlay);
        // draw polygons for every segmentation
        resource.annotations.forEach(annotation => {
          // create polygon
          const polygon = new fabric.Polygon(segmentation(annotation.segmentation), {
            fill: 'rgba(25,48,96,.1)',
            stroke: 'green',
            // fill: 'transparent',
            // stroke: 'transparent',
            strokeWidth: 4,
            objectCaching: false,
            hasBorders: false,
            cornerColor: 'rgba(0,0,255,0.5)',
            cornerStyle: 'circle',
            transparentCorners: false,
            selectable: false,
            lockMovementX: true, // stop dragging x axis
            lockMovementY: true, // stop dragging y axis
            hoverCursor: 'pointer',
            name: `segmentation-${annotation.id}`,
            data: {
              id: annotation.id,
              isSelected: false
            }
          });
          // observe mousedown event
          polygon.on('mousedown', (e: fabric.IEvent<Event>) => {
            if (e.target) {
              // get polygon
              const poly = e.target as fabric.Polygon;
              // active polygon
              overlay.fabricCanvas().setActiveObject(poly);
              // enable edit mode
              enableEditMode(poly);
              // update canvas
              overlay.render();
              // Don't remove it yet
              // // center the clicked polygon
              // if (e.target.aCoords) {
              //   const bb = viewer.viewport.imageToViewportRectangle(
              //     e.target.aCoords.tl.x,
              //     e.target.aCoords.tl.y,
              //     e.target.width,
              //     e.target.height
              //   );
              //   viewer.viewport.fitBounds(bb);
              //   // alternative
              //   // viewer.viewport.panTo(bb.getCenter());
              // }
              // // get all objects
              // const objs = overlay.fabricCanvas().getObjects();
              // // for every object track event click and update style
              // objs.forEach(o => {
              //   if (o.name === e.target?.name) {
              //     o.data.isSelected = true;
              //     o.set('fill', 'rgba(25,48,96,.1)');
              //     o.set('stroke', 'green');
              //   } else {
              //     o.data.isSelected = false;
              //     o.set('fill', 'transparent');
              //     o.set('stroke', 'transparent');
              //   }
              // });
            }
          });
          // add polygon
          overlay.fabricCanvas().add(polygon);

          // Don't remove it yet
          // overlay.fabricCanvas().on('mouse:over', (e: fabric.IEvent<MouseEvent>) => {
          //   if (e.target) {
          //     e.target.set('fill', 'rgba(25,48,96,.1)');
          //     e.target.set('stroke', 'green');
          //     overlay.render();
          //   }
          // });
          // overlay.fabricCanvas().on('mouse:out', (e: fabric.IEvent<MouseEvent>) => {
          //   if (e.target) {
          //     if (!e.target.data.isSelected) {
          //       e.target.set('fill', 'transparent');
          //       e.target.set('stroke', 'transparent');
          //       overlay.render();
          //     }
          //   }
          // });
        });
        // capture right click event
        // open custom menu
        fabric.util.addListener(
          document.getElementsByClassName('upper-canvas')[0] as HTMLCanvasElement,
          'contextmenu',
          function (e: MouseEvent) {
            // check if any target was clicked
            const target = overlay.fabricCanvas().findTarget(e, false) as fabric.Polygon;
            if (target) {
              setContextMenu({
                target,
                mouseX: e.clientX,
                mouseY: e.clientY
              });
            }
            e.preventDefault();
          }
        );
      });
    });

    return () => {
      viewer.destroy();
    };
  }, [resource.images, resource.annotations, enableEditMode]);

  return (
    <Box style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Box id="osd-viewer" style={{ height: '100%', width: '100%', background: '#363636' }}></Box>
      <NavigatorOverlay />
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
      >
        <MenuItem onClick={deleteAnnotation}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Remove annotation</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Viewer;
