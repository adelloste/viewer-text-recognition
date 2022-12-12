import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

const MainLayout = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton animation="wave" height={40} width="50%" sx={{ mb: 1 }} />
        <Skeleton animation="wave" height={30} width="30%" />
      </Box>
    );
  }

  return <>{children}</>;
};

export default MainLayout;
