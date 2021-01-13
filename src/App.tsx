import React from 'react';
import { isBrowserSupported } from './api/file';
import { useData } from './use/game';

import MainScaffold from './components/MainScaffold';
import Drawer from './components/Drawer';
import MainBar from './components/MainBar';

import Main from './components/Main';
import NotSupported from './components/util/NotSupported';
import StartButton from './components/util/StartButton';

import GlobalTooltip from './components/tooltip/GlobalTooltip';

function App() {
  const { start, campaign } = useData();

  if (isBrowserSupported() === false) {
    return <NotSupported />;
  }

  return (
    <>
      <MainScaffold
        drawerOpen={true}
        mobileDrawerOpen={false}
        toggleDrawer={() => {}}
        barContent={<MainBar />}
        mainContent={campaign ? <Main /> : <StartButton onClick={start} />}
        drawerContent={campaign ? <Drawer /> : <></>}
      />

      <GlobalTooltip />
    </>
  );
}

export default App;
