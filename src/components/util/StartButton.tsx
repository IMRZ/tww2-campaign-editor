import React from 'react';
import { makeStyles, Button, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bolder'
  }
}));

const StartButton = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.container} variant="outlined">
        <ul>
          <li>
            <Typography>Make sure the game is running with the mod activated</Typography>
          </li>
          <li>
            <Typography>Select the correct folder. Press F11 ingame so see what the folder is or use this shortcut: <span className={classes.bold}>%USERPROFILE%\wh2_web_editor_mod</span></Typography>
          </li>
        </ul>
        <Button onClick={props.onClick} variant="outlined">Start</Button>
      </Paper>
    </div>
  );
};

export default StartButton;
