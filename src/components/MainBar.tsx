import React from 'react';
import { makeStyles, Toolbar, IconButton, Typography } from '@material-ui/core';
import { GitHub, Help } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
  },
  github: {
    [theme.breakpoints.up('md')]: {
      marginRight: -12,
    },
  },
  fillSpace: {
    flexGrow: 1,
  },
  toggleButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const MainBar = () => {
  const classes = useStyles();

  return (
    <Toolbar>
      <div className={classes.title}>
        <Typography variant="h6" noWrap>
          Total War: WARHAMMER II
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" noWrap>
          Campaign Editor - {process.env.REACT_APP_VERSION}
        </Typography>
      </div>
      <span className={classes.fillSpace}></span>
      <IconButton
        color="inherit"
        component="a"
        href="https://steamcommunity.com/sharedfiles/filedetails/?id=2295560801"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Help />
      </IconButton>
      <IconButton
        className={classes.github}
        color="inherit"
        component="a"
        href="https://github.com/IMRZ/tww2-campaign-editor"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub />
      </IconButton>
    </Toolbar>
  );
};

export default MainBar;
