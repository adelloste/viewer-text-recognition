import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import MainLayout from '../../common/components/MainLayout/MainLayout';

const Collection = () => {
  const { id } = useParams();

  return (
    <MainLayout isLoading={false}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {id}
      </Container>
    </MainLayout>
  );
};

export default Collection;
