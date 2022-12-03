import React from 'react';
import IconButton from '@mui/material/IconButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import CropFreeIcon from '@mui/icons-material/CropFree';
import Stack from '@mui/material/Stack';

const Controls = () => {
  return (
    <Stack
      direction="column"
      spacing={1}
      style={{
        position: 'absolute',
        right: '1.25rem',
        top: '1.25rem'
      }}
    >
      <IconButton id="osd-zoom-in" aria-label="zoom in" color="primary">
        <ZoomInIcon />
      </IconButton>
      <IconButton id="osd-zoom-out" aria-label="zoom oout" color="primary">
        <ZoomOutIcon />
      </IconButton>
      <IconButton id="osd-home" aria-label="home" color="primary">
        <CenterFocusStrongIcon />
      </IconButton>
      <IconButton id="osd-fulls" aria-label="fulls" color="primary">
        <CropFreeIcon />
      </IconButton>
    </Stack>
  );
};

export default Controls;
