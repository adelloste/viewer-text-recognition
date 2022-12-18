import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SourceIcon from '@mui/icons-material/Source';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Collection } from '../../../app/definitions/types';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    minWidth: 180,
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      }
    }
  }
}));

type Props = {
  collection: Collection;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const CollectionItem = ({ collection, handleEdit, handleDelete }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editCollection = () => {
    handleClose();
    handleEdit(collection.id);
  };

  const deleteCollection = () => {
    handleClose();
    handleDelete(collection.id);
  };

  return (
    <Card>
      <CardHeader
        avatar={<FolderOpenIcon color="primary" />}
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls={open ? 'collection-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <StyledMenu
              id="collection-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'collection-button'
              }}
            >
              <MenuItem onClick={editCollection}>
                <SourceIcon />
                Edit
              </MenuItem>
              <MenuItem onClick={deleteCollection}>
                <DeleteIcon />
                Delete
              </MenuItem>
            </StyledMenu>
          </>
        }
        title={collection.name}
        subheader={collection.date}
      />
    </Card>
  );
};

export default CollectionItem;
