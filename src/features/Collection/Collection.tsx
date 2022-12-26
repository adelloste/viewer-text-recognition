import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MainLayout from '../../common/components/MainLayout/MainLayout';
import ListItems from './components/ListItems';
import Info from './components/Info';
import {
  useDeleteCollectionMutation,
  useGetCollectionQuery,
  useUploadMutation
} from '../../app/services/split/library';
import { useDialogAddPages } from './hooks/useDialogAddPages';
import { drawerWidth } from '../../common/constants';

const Collection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetCollectionQuery({ id });
  const [deleteCollection] = useDeleteCollectionMutation();
  const [upload] = useUploadMutation();

  const { dialog, handleClose, handleOpen } = useDialogAddPages({
    onSubmit: data => {
      handleClose();
      // create form data
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      for (let i = 0; i < data.files.length; i++) {
        formData.append('file', data.files[i]);
      }
      void upload({ id, data: formData });
    }
  });

  const handleDelete = (id: string) => {
    void deleteCollection({ id })
      .unwrap()
      .then(() => navigate('/main/library'));
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
              <ListItems collections={data} />
            </Box>
          </Drawer>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Info collection={data[0]} addPages={handleOpen} deleteCollection={handleDelete} />
            {dialog}
          </Box>
        </Box>
      )}
    </MainLayout>
  );
};

export default Collection;
