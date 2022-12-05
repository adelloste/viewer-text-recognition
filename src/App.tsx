import React from 'react';
import { useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import { routes } from './common/routes/routes';

const App = () => {
  const routing = useRoutes(routes);

  return <Box style={{ width: '100%', height: '100vh' }}>{routing}</Box>;
};

export default App;
