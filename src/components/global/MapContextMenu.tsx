import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { useDrawer } from '../useDrawer';

const MapContextMenu = (props: any) => {
  const state = props.state;

  const onContextMenu = (e: any) => {
    e.preventDefault();
    props.onClose();
  };

  const drawer = useDrawer()
  const onClickCreateLord = () => {
    drawer.openActiveModal(['lord', state]);
    props.onClose();
  };

  const onClickCreateHero = () => {
    drawer.openActiveModal(['hero', state]);
    props.onClose();
  };

  return (
    <Menu
      keepMounted
      onContextMenu={onContextMenu}
      open={!!state}
      onClose={props.onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        state
          ? { top: state.originalEvent.clientY, left: state.originalEvent.clientX }
          : undefined
      }
    >
      <MenuItem onClick={onClickCreateLord}>Create lord here</MenuItem>
      <MenuItem onClick={onClickCreateHero}>Create hero here</MenuItem>
    </Menu>
  );
};

export default MapContextMenu;
