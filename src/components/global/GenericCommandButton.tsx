import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Language, AttachMoney } from '@material-ui/icons';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { useDrawer } from '../useDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
}));

const GenericCommandButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const drawer = useDrawer();

  const onClickModTreasury = () => {
    drawer.openActiveModal(['treasury_mod', null]);
    setOpen(false);
  };

  const actions = [
    { icon: <AttachMoney />, name: 'Modify treasury', onClick: onClickModTreasury },
  ];

  return (
    <SpeedDial
      ariaLabel="Global actions"
      className={classes.root}
      icon={<SpeedDialIcon icon={<Language />} />}
      open={open}
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

export default GenericCommandButton;
