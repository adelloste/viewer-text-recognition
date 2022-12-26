import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

type ItemLink = {
  name: string;
  url: string;
  isChild: boolean;
};

const ListItemLink = ({ name, url, isChild }: ItemLink) => {
  const resolved = useResolvedPath(url);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <ListItemButton sx={{ pl: isChild ? 6 : 4 }} component={Link} to={url} selected={!!match}>
      <ListItemText primary={name} />
    </ListItemButton>
  );
};

export default ListItemLink;
