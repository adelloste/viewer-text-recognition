import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Lib } from '../../../app/definitions/types';

const LibraryInfo = ({ countCollections, countVolumes, countPages, countLines }: Lib) => (
  <Box color="text.secondary">
    <Typography variant="body2" gutterBottom>
      Collection: {countCollections}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Volumes: {countVolumes}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Pages: {countPages}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Lines: {countLines}
    </Typography>
  </Box>
);

export default LibraryInfo;
