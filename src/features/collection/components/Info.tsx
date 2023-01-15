import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhotoIcon from '@mui/icons-material/Photo';
import { Collection } from '../../../definitions/types';

type Props = {
  collection: Collection;
  addPages: () => void;
  deleteCollection: (id: string) => void;
  editCollection: (id: string, name: string, description: string) => void;
};

const Info = ({ collection, addPages, editCollection, deleteCollection }: Props) => {
  const { id, name, description, ...rest } = collection;

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2} paddingBottom={3}>
            <FolderOpenIcon color="primary" />
            <Typography variant="h6" color="primary.main" gutterBottom>
              {name}
            </Typography>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => editCollection(id, name, description)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
        <Box>
          <Button
            variant="contained"
            endIcon={<DeleteOutlineIcon />}
            sx={{ textTransform: 'none' }}
            onClick={() => deleteCollection(id)}
          >
            Delete Collection
          </Button>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, color: 'text.secondary' }}>
        <Typography variant="body2" gutterBottom>
          Creation Date: {rest.creation_date}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Last Update: {rest.last_update}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Pages: {rest.count_pages}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lines: {rest.count_lines}
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ py: 4 }}>
          {description}
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
