import React from 'react';
import Box from '@mui/material/Box';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PhotoIcon from '@mui/icons-material/Photo';
import { Collection } from '../../../definitions/types';
import { styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  collection: Collection;
  openPage: (id: string) => void;
  deletePage: (idCollection: string, idNode: string) => void;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)'
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}));

type StyledTreeItemProps = TreeItemProps & {
  isChild: boolean;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelText?: string;
  actionNode?: () => void;
};

const StyledTreeItem = (props: StyledTreeItemProps) => {
  const { isChild, labelIcon: LabelIcon, labelText, actionNode, ...rest } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          {isChild && (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={e => {
                e.stopPropagation();
                actionNode?.();
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      }
      {...rest}
    />
  );
};

const ListItems = ({ collection, openPage, deletePage }: Props) => {
  const renderTree = (node: Collection) => (
    <StyledTreeItem
      key={node.id}
      nodeId={node.id}
      isChild={node.isChild}
      labelText={node.name}
      labelIcon={node.isChild ? PhotoIcon : FolderOpenIcon}
      {...(node.isChild && {
        onClick: () => openPage(node.id),
        actionNode: () => deletePage(collection.id, node.id)
      })}
    >
      {Array.isArray(node.children) ? node.children.map(child => renderTree(child)) : null}
    </StyledTreeItem>
  );

  return (
    <TreeView
      aria-label="collection"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={[collection.id]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, overflowY: 'auto' }}
    >
      {renderTree(collection)}
    </TreeView>
  );
};

export default ListItems;
