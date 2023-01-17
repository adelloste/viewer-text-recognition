import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

type Props = {
  open: boolean;
  caption?: string;
  children: React.ReactNode;
};

const LoadingSpinnerOverlay = ({ open, caption, children }: Props) => {
  return (
    <>
      <Backdrop
        sx={{ color: 'white', flexDirection: 'column', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="primary" />
        <Typography sx={{ pt: 2 }}>{caption || 'Loading...'}</Typography>
      </Backdrop>
      {children}
    </>
  );
};

export default LoadingSpinnerOverlay;
