import React from 'react';
import { makeStyles, AppBar, Toolbar, Drawer, Divider } from '@material-ui/core';
import { useStoreState } from '../store';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: 'visible',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: -drawerWidth,
  },
  scroller: {
    height: '100%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      width: 6,
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  }
}));

type MainScaffoldProps = {
  barContent: React.ReactElement;
  mainContent: React.ReactElement;
  drawerContent: React.ReactElement;
};

const MainScaffold = (props: MainScaffoldProps) => {
  const classes = useStyles();

  const selectedObject = useStoreState((state) => state.game.selectedObject);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" color="inherit" elevation={0}>
        {props.barContent}
        <Divider />
      </AppBar>
      <main className={classes.content}>
        <Toolbar />
        {props.mainContent}
      </main>
      <nav className={classes.drawer}>
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          open={!!selectedObject}
          variant="persistent"
          anchor="right"
        >
          <Toolbar />
          <div className={classes.scroller}>
            {props.drawerContent}
          </div>
        </Drawer>
      </nav>
    </div>
  );
};

export default MainScaffold;
