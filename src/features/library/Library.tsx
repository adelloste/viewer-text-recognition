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
  useDeleteCollectionByIdMutation,
  useDownloadMutation,
  useGetLibraryQuery
} from '../api/split/library';
import MainLayout from '../../common/components/MainLayout/MainLayout';
import CollectionItem from './components/CollectionItem';
import ConfirmDialog from '../../common/components/ConfirmDialog/ConfirmDialog';
import CollectionDialog from '../collection/components/CollectionDialog';
import { useModal } from '../dialog/hooks/useModal';

const Library = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetLibraryQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  const [addCollection] = useAddCollectionMutation();
  const [deleteCollectionBy] = useDeleteCollectionByIdMutation();
  const [downloadCollection] = useDownloadMutation();
  const { showModal } = useModal();

  const handleCreateCollection = () => {
    const { hide } = showModal(CollectionDialog, {
      title: 'Create new collection',
      description:
        'The collection will be initialized without any contents. You can add Pages to this collection after completing its creation',
      handleClose: data => {
        hide();

        if (data) {
          void addCollection(data);
        }
      }
    });
  };

  const handleEdit = (id: string) => {
    navigate(`/main/collection/${id}`);
  };

  const handleDelete = (id: string) => {
    const { hide } = showModal(ConfirmDialog, {
      title: 'Delete collection',
      description: 'Do you really want to delete this collection? The process cannot be undone',
      handleClose: status => {
        hide();

        if (status) {
          void deleteCollectionBy({ id });
        }
      }
    });
  };

  const handleDownload = (id: string) => {
    void downloadCollection({ id });
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
      </Container>
    </MainLayout>
  );
};

export default Library;
