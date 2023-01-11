import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Lib } from '../../../definitions/types';

const LibraryInfo = ({ count_collections, count_pages, count_lines }: Lib) => (
  <Box color="text.secondary">
    <Typography variant="body2" gutterBottom>
      Collection: {count_collections}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Pages: {count_pages}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Lines: {count_lines}
    </Typography>
  </Box>
);

export default LibraryInfo;
