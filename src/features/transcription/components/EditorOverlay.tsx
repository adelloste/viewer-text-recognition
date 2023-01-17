import React from 'react';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import WidgetsIcon from '@mui/icons-material/Widgets';
import NotesIcon from '@mui/icons-material/Notes';

type Props = {
  autoSegment: () => void;
  autoTranscribe: () => void;
  save: () => void;
  download: () => void;
};

const EditorOverlay = ({ autoSegment, autoTranscribe, save, download }: Props) => {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        position: 'absolute',
        left: '1.25rem',
        top: '1.25rem',
        zIndex: 10,
        backgroundColor: 'hsla(0,0%,47.8%,.3)'
      }}
    >
      <Tooltip title="Auto Segment" placement="right">
        <IconButton id="auto-segment" color="primary" onClick={autoSegment}>
          <WidgetsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Auto Transcribe" placement="right">
        <IconButton id="auto-transcribe" color="primary" onClick={autoTranscribe}>
          <NotesIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Save" placement="right">
        <IconButton id="save" color="primary" onClick={save}>
          <SaveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download" placement="right">
        <IconButton id="download" color="primary" onClick={download}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default EditorOverlay;
