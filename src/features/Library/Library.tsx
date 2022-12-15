import React from 'react';
import MainLayout from '../../common/components/MainLayout/MainLayout';
import { useGetLibraryQuery } from '../../app/services/api';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Tree from './components/Tree';
import LibraryInfo from './components/LibraryInfo';

const Library = () => {
  const { data, isLoading } = useGetLibraryQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  return (
    <MainLayout isLoading={isLoading}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2} paddingBottom={3}>
              <CollectionsIcon color="primary" />
              <Typography variant="h6" color="primary.main" gutterBottom>
                Your library
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Button
              variant="contained"
              endIcon={<AddPhotoAlternateIcon />}
              sx={{ textTransform: 'none' }}
            >
              Add new Collection
            </Button>
          </Box>
        </Box>
        {data && <LibraryInfo {...data} />}
        {data?.collections && (
          <Box paddingTop={3}>
            <Tree collections={data.collections} />
          </Box>
        )}
      </Container>
    </MainLayout>
  );
};

export default Library;
