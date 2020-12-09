import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Language, Visibility, AttachMoney, Flag } from '@material-ui/icons';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { useDrawer } from '../useDrawer';
import { useCommand } from '../../use/command';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
}));

const CommandSpeedDial = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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

  const actions = [
    { icon: <Visibility />, name: 'Toggle shroud', onClick: onClickToggleShroud },
    { icon: <AttachMoney />, name: 'Modify treasury', onClick: onClickModTreasury },
    { icon: <Flag />, name: 'Diplomacy', onClick: onClickDiplomacy },
  ];

  return (
    <SpeedDial
      ariaLabel="command-speed-dial"
      className={classes.root}
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
