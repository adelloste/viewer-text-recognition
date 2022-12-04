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
            fill: 'rgba(25,48,96,.1)',
            strokeWidth: 4,
            stroke: 'green',
            objectCaching: false,
            transparentCorners: false,
            cornerColor: 'blue',
            cornerStyle: 'circle',
            selectable: false,
            hoverCursor: 'pointer',
            name: `segmentation-${annotation.id}`
          });
          // observe mousedown event
          polygon.on('mousedown', e => {
            if (e.target) {
              // center the clicked polygon
              if (e.target.aCoords) {
                const overlay = viewer.viewport.imageToViewportRectangle(
                  e.target.aCoords.tl.x,
                  e.target.aCoords.tl.y,
                  e.target.width,
                  e.target.height
                );
                viewer.viewport.fitBounds(overlay);
                // alternative
                // viewer.viewport.panTo(overlay.getCenter());
              }
            }
          });
          // add polygon
          overlay.fabricCanvas().add(polygon);
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
