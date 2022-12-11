import React from 'react';
import Box from '@mui/material/Box';
import { appBarHeight } from '../../constants';

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  return (
    <Box
      component="main"
      sx={{
        height: `calc(100vh - ${appBarHeight}px)`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
