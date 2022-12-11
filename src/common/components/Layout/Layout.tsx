import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../Header/Header';
import Main from '../Main/Main';

const Layout = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Header />
    <Main>
      <Outlet />
    </Main>
  </Box>
);

export default Layout;
