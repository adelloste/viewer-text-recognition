import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { AddItemWorldEvent } from 'openseadragon';
import { fabric } from 'fabric';
import Controls from './Controls';
import { Resource } from '../../../app/definitions/types';

declare const OpenSeadragon: any;

type Props = {
  resource: Resource;
};

const Viewer = ({ resource }: Props) => {
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
        url: '/images/document-01.jpg',
        buildPyramid: false,
        width: resource.images[0].width,
        height: resource.images[0].height
      },
      gestureSettingsMouse: {
        clickToZoom: false
      }
    });

    viewer.world.addHandler('add-item', (addItemEvent: AddItemWorldEvent) => {
      const tiledImage = addItemEvent.item;
      tiledImage.addHandler('fully-loaded-change', () => {
        // Initialize overlay
        const overlay = viewer.fabricjsOverlay({
          scale: resource.images[0].width // Maybe should we have one image?
        });
        // draw polygons for every segmentation
        resource.annotations.forEach(annotation => {
          // create polygon
          const polygon = new fabric.Polygon(segmentation(annotation.segmentation), {
            // fill: 'rgba(25,48,96,.1)',
            // stroke: 'green',
            fill: 'transparent',
            stroke: 'transparent',
            strokeWidth: 4,
            objectCaching: false,
            transparentCorners: false,
            cornerColor: 'blue',
            cornerStyle: 'circle',
            selectable: false,
            hoverCursor: 'pointer',
            name: `segmentation-${annotation.id}`,
            data: {
              isSelected: false
            }
          });
          // observe mousedown event
          polygon.on('mousedown', (e: fabric.IEvent<Event>) => {
            if (e.target) {
              // center the clicked polygon
              if (e.target.aCoords) {
                const bb = viewer.viewport.imageToViewportRectangle(
                  e.target.aCoords.tl.x,
                  e.target.aCoords.tl.y,
                  e.target.width,
                  e.target.height
                );
                viewer.viewport.fitBounds(bb);
                // alternative
                // viewer.viewport.panTo(bb.getCenter());
              }
              // get all objects
              const objs: fabric.Object[] = overlay.fabricCanvas().getObjects();
              // for every object track event click and update style
              objs.forEach(o => {
                if (o.name === e.target?.name) {
                  o.data.isSelected = true;
                  o.set('fill', 'rgba(25,48,96,.1)');
                  o.set('stroke', 'green');
                } else {
                  o.data.isSelected = false;
                  o.set('fill', 'transparent');
                  o.set('stroke', 'transparent');
                }
              });
            }
          });
          // add polygon
          overlay.fabricCanvas().add(polygon);

          overlay.fabricCanvas().on('mouse:over', (e: fabric.IEvent<MouseEvent>) => {
            if (e.target) {
              e.target.set('fill', 'rgba(25,48,96,.1)');
              e.target.set('stroke', 'green');
              overlay.render();
            }
          });

          overlay.fabricCanvas().on('mouse:out', (e: fabric.IEvent<MouseEvent>) => {
            if (e.target) {
              if (!e.target.data.isSelected) {
                e.target.set('fill', 'transparent');
                e.target.set('stroke', 'transparent');
                overlay.render();
              }
            }
          });
        });
      });
    });

    return () => {
      viewer.destroy();
    };
  }, [resource]);

  const segmentation = (values: number[]) => {
    return values.reduce((result: { x: number; y: number }[], value, index, array) => {
      if (index % 2 === 0) {
        const sl = array.slice(index, index + 2);
        result.push({ x: sl[0], y: sl[1] });
      }
      return result;
    }, []);
  };

  return (
    <Box style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Box id="osd-viewer" style={{ height: '100%', width: '100%', background: '#000000' }}></Box>
      <Controls />
    </Box>
  );
};

export default Viewer;
