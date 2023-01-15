import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MainLayout from '../../common/components/MainLayout/MainLayout';
import ListItems from './components/ListItems';
import Info from './components/Info';
import AddPagesDialog from './components/AddPagesDialog';
import ConfirmDialog from '../../common/components/ConfirmDialog/ConfirmDialog';
import CollectionDialog from './components/CollectionDialog';
import {
  useDeleteCollectionByIdMutation,
  useDeleteNodeByIdMutation,
  useGetCollectionByIdQuery,
  useUpdateCollectionByIdMutation,
  useUploadMutation
} from '../api/split/library';
import { useModal } from '../dialog/hooks/useModal';
import { drawerWidth } from '../../common/constants';

const Collection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showModal } = useModal();
  const { data, isLoading } = useGetCollectionByIdQuery({ id });
  const [updateCollectionById] = useUpdateCollectionByIdMutation();
  const [deleteCollectionById] = useDeleteCollectionByIdMutation();
  const [deleteNodeById] = useDeleteNodeByIdMutation();
  const [upload] = useUploadMutation();

  const handleAddPages = () => {
    const { hide } = showModal(AddPagesDialog, {
      handleClose: data => {
        hide();

        if (data) {
          // create form data
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('description', data.description);
          for (let i = 0; i < data.files.length; i++) {
            formData.append('file', data.files[i]);
          }
          void upload({ id, data: formData });
        }
      }
    });
  };

  const handleDelete = (id: string) => {
    const { hide } = showModal(ConfirmDialog, {
      title: 'Delete collection',
      description: 'Do you really want to delete this collection? The process cannot be undone',
      handleClose: status => {
        hide();

        if (status) {
          void deleteCollectionById({ id })
            .unwrap()
            .then(() => navigate('/main/library', { replace: true }));
        }
      }
    });
  };

  const handleEdit = (id: string, name: string, description: string) => {
    const { hide } = showModal(CollectionDialog, {
      title: 'Update collection',
      description: 'The collection will be updated with the below data',
      defaultValues: {
        name,
        description
      },
      handleClose: data => {
        hide();

        if (data) {
          void updateCollectionById({ id, data });
        }
      }
    });
  };

  const handleOpenPage = (id: string) => {
    navigate(`/main/transcription/${id}`);
  };

  const handleDeletePage = (idCollection: string, idNode: string) => {
    const { hide } = showModal(ConfirmDialog, {
      title: 'Delete item',
      description: 'Do you really want to delete this item? The process cannot be undone',
      handleClose: status => {
        hide();

        if (status) {
          void deleteNodeById({ idCollection, idNode });
        }
      }
    });
  };

  return (
    <MainLayout isLoading={isLoading}>
      {data && (
        <Box sx={{ display: 'flex' }}>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
            }}
          >
            <Toolbar variant="dense" />
            <Box sx={{ overflow: 'auto' }}>
              <ListItems
                collection={data}
                openPage={handleOpenPage}
                deletePage={handleDeletePage}
              />
            </Box>
          </Drawer>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Info
              collection={data}
              addPages={handleAddPages}
              editCollection={handleEdit}
              deleteCollection={handleDelete}
            />
          </Box>
        </Box>
      )}
    </MainLayout>
  );
};

export default Collection;
