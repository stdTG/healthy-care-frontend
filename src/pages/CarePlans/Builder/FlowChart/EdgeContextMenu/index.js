import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { actions } from 'services/widget';
import { useDispatch } from 'react-redux';

const EdgeContextMenu = ({ isOpen, posX, posY, onClose, edge }) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(actions.removeWidgetOrAssociation(edge));
  };

  return (
    <div>
      <Menu
        keepMounted
        open={isOpen}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={
          posY !== null && posX !== null ? { top: posY, left: posX } : undefined
        }
      >
        <MenuItem onClick={onRemove}>Delete Connection</MenuItem>
      </Menu>
    </div>
  );
};

export default EdgeContextMenu;
