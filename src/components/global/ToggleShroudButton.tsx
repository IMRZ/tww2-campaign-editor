import React from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';

import { useCommand } from '../../use/command';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
}));

const ToggleShroudButton = () => {
  const classes = useStyles();

  const { toggleShroud } = useCommand();
  const onClick = () => {
    toggleShroud()
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  return (
    <Fab color="primary" className={classes.fab} onClick={onClick}>
      <Visibility />
    </Fab>
  );
};

export default ToggleShroudButton;
