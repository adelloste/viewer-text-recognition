import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Collection } from '../../../app/definitions/types';

type Props = {
  collections: Collection[];
};

const renderTree = (nodes: Collection) => (
  <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
    {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
  </TreeItem>
);

const Tree = ({ collections }: Props) => {
  return (
    <>
      {collections.map(item => {
        return (
          <TreeView
            key={item.id}
            aria-label={`collection-${item.id}`}
            defaultCollapseIcon={<ExpandMoreIcon />}
            // defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(item)}
          </TreeView>
        );
      })}
    </>
  );
};

export default Tree;
