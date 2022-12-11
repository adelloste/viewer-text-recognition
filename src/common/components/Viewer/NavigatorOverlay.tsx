import React from 'react';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import CropFreeIcon from '@mui/icons-material/CropFree';

const NavigatorOverlay = () => {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        position: 'absolute',
        right: '1.25rem',
        top: '1.25rem',
        backgroundColor: 'hsla(0,0%,47.8%,.3)',
        '& .MuiButtonBase-root': {
          display: 'inline-flex !important'
        }
      }}
    >
      <Tooltip title="Increase zoom level" placement="left">
        <IconButton id="osd-zoom-in" color="primary">
          <ZoomInIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Decrease zoom level" placement="left">
        <IconButton id="osd-zoom-out" color="primary">
          <ZoomOutIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Center" placement="left">
        <IconButton id="osd-home" color="primary">
          <CenterFocusStrongIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Fullscreen" placement="left">
        <IconButton id="osd-fulls" color="primary">
          <CropFreeIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default NavigatorOverlay;
