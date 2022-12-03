import React from 'react';
import Box from '@mui/material/Box';
import Editor from './features/Editor/Editor';

const App = () => {
  return (
    <Box style={{ width: '100%', height: '100vh' }}>
      <Editor />
    </Box>
  );
};

export default App;
