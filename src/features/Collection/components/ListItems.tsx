import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemLink from './ListItemLink';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Collection } from '../../../app/definitions/types';
import { drawerWidth } from '../../../common/constants';

type Props = {
  collections: Collection[];
};

const ListItems = ({ collections }: Props) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: drawerWidth,
        backgroundColor: 'background.paper'
      }}
    >
      <List component="nav" aria-labelledby="nested-list-subheader">
        {collections.map((item, i) =>
          item.children.length > 0 ? (
            <React.Fragment key={i}>
              <ListItemButton sx={{ pl: 4 }} onClick={handleClick()}>
                <ListItemIcon>
                  <FolderOpenIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {open ? (
                  <ExpandLessRoundedIcon color="action" />
                ) : (
                  <ExpandMoreRoundedIcon color="action" />
                )}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {item.children.map((item, i) => (
                  <List key={i} component="div" disablePadding>
                    <ListItemLink
                      key={i}
                      isChild={true}
                      name={item.name}
                      url={`/main/transcription/${item.id}`}
                    />
                  </List>
                ))}
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItemLink
              key={i}
              isChild={false}
              name={item.name}
              url={`/main/transcription/${item.id}`}
            />
          )
        )}
      </List>
    </Box>
  );
};

export default ListItems;
