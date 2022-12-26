import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const PAGES = [{ id: 0, name: 'Library', url: '/main/library' }];

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters variant="dense">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                fontWeight: 700,
                letterSpacing: '.3rem'
              }}
            >
              Matrices
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              {PAGES.map(({ id, name, url }) => (
                <Button
                  key={id}
                  onClick={() => navigate(url)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar variant="dense" />
    </>
  );
};

export default Header;
