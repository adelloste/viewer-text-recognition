import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <>
      <AppBar elevation={0} position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters variant="dense">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.3rem'
              }}
            >
              Matrices
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar variant="dense" />
    </>
  );
};

export default Header;
