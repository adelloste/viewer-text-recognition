import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
  useAddCollectionMutation,
  useDeleteCollectionMutation,
  useGetLibraryQuery
} from '../../app/services/split/library';
import { useDialogCreateCollection } from './hooks/useDialogCreateCollection';
import MainLayout from '../../common/components/MainLayout/MainLayout';
import CollectionItem from './components/CollectionItem';

const Library = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetLibraryQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  const [addCollection] = useAddCollectionMutation();
  const [deleteCollection] = useDeleteCollectionMutation();

  const { dialog, handleClose, handleOpen } = useDialogCreateCollection({
    onSubmit: async data => {
      handleClose();
      // TODO: catch error
      await addCollection(data);
    }
  });

  const handleCreateCollection = () => {
    handleOpen();
  };

  const handleEdit = (id: string) => {
    navigate(`/main/collection/${id}`);
  };

  const handleDelete = (id: string) => {
    // TODO: catch error
    void deleteCollection({ id });
  };

  const handleDownload = (id: string) => {
    //
  };

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
              onClick={handleCreateCollection}
            >
              Add new Collection
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {data?.collections.map(collection => (
              <Grid item xs={2} sm={4} md={3} key={collection.id}>
                <CollectionItem
                  collection={collection}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleDownload={handleDownload}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {dialog}
      </Container>
    </MainLayout>
  );
};

export default Library;
