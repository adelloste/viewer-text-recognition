import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhotoIcon from '@mui/icons-material/Photo';
import { Collection } from '../../../app/definitions/types';

type Props = {
  collection: Collection;
  addPages: () => void;
  deleteCollection: (id: string) => void;
};

const Info = ({ collection, addPages, deleteCollection }: Props) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2} paddingBottom={3}>
            <FolderOpenIcon color="primary" />
            <Typography variant="h6" color="primary.main" gutterBottom>
              {collection.name}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Button
            variant="contained"
            endIcon={<DeleteOutlineIcon />}
            sx={{ textTransform: 'none' }}
            onClick={() => deleteCollection(collection.id)}
          >
            Delete Collection
          </Button>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, color: 'text.secondary' }}>
        <Typography variant="body2" gutterBottom>
          Creation Date: {collection.creation_date}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Last Update: {collection.last_update}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Pages: {collection.count_pages}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lines: {collection.count_lines}
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ py: 4 }}>
          {collection.description}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            endIcon={<PhotoIcon />}
            sx={{ textTransform: 'none' }}
            onClick={addPages}
          >
            Add new Page
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Info;
