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
    padding: theme.spacing(3),
  },
  start: {
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
        <Typography variant="h4">Instructions:</Typography>
        <ul>
          <li>
            <Typography>Make sure the game is running with the mod activated</Typography>
          </li>
          <li>
            <Typography>Wait for the game to fully load and you are able to interact with the game world</Typography>
          </li>
          <li>
            <Typography>Select the correct folder. Press F11 ingame so see what the folder is or copy/paste the following shortcut: <span className={classes.bold}>%USERPROFILE%\wh2_web_editor_mod</span></Typography>
          </li>
        </ul>

        <div className={classes.start}>
          <Button onClick={props.onClick} variant="outlined">Start</Button>
        </div>
      </Paper>
    </div>
  );
};

export default StartButton;