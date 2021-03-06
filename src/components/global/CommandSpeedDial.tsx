import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Language, Visibility, AttachMoney, Flag, AddBox, Ballot } from '@material-ui/icons';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { useDrawer } from '../useDrawer';
import { useCommand } from '../../use/command';

import clsx from 'clsx';
import { useStoreState } from '../../store';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
    marginRight: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentShift: {
    marginRight: 320,
  },
}));

const CommandSpeedDial = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const selectedObject = useStoreState((state) => state.game.selectedObject);

  const drawer = useDrawer();

  const onClickModTreasury = () => {
    drawer.openActiveModal(['treasury_mod', null]);
    setOpen(false);
  };

  const { toggleShroud } = useCommand();
  const onClickToggleShroud = () => {
    toggleShroud()
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  const onClickDiplomacy = () => {
    drawer.openActiveModal(['diplomacy', null]);
    setOpen(false);
  };

  const onClickAddAncillary = () => {
    drawer.openActiveModal(['add_ancillary_faction', null]);
    setOpen(false);
  };

  const onClickPooledResource = () => {
    drawer.openActiveModal(['pooled_resource', null]);
    setOpen(false);
  };

  const actions = [
    { icon: <Visibility />, name: 'Toggle shroud', onClick: onClickToggleShroud },
    { icon: <AttachMoney />, name: 'Modify treasury', onClick: onClickModTreasury },
    { icon: <Flag />, name: 'Diplomacy', onClick: onClickDiplomacy },
    { icon: <AddBox />, name: 'Add ancillary/item', onClick: onClickAddAncillary },
    { icon: <Ballot />, name: 'Modify pooled resource', onClick: onClickPooledResource },
  ];

  return (
    <SpeedDial
      ariaLabel="command-speed-dial"
      className={clsx(classes.root, { [classes.contentShift]: !!selectedObject })}
      icon={<SpeedDialIcon icon={<Language />} />}
      open={open}
      direction="down"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default CommandSpeedDial;
