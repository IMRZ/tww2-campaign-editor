import React from 'react';
import { makeStyles, Toolbar, IconButton, Typography } from '@material-ui/core';
import { GitHub, Help } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 52,
    height: 52,
    marginRight: theme.spacing(1),
    filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))'
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
      <img className={classes.logo} src={`${process.env.PUBLIC_URL}/images/logo.webp`} alt="" />
      <Typography variant="h6" noWrap>Campaign Editor</Typography>
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
