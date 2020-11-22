import React from 'react';
import { useStoreState } from '../store';

import SettlementInfoPanel from './region/SettlementInfoPanel';
import LordInfoPanel from './lord/LordInfoPanel';
import HeroInfoPanel from './hero/HeroInfoPanel';

const Drawer = () => {
  const selectedObject = useStoreState((state) => state.game.selectedObject);

  const Panels = () => {
    if (!selectedObject) {
      return null;
    }

    const [type, cqi] = selectedObject;

    switch (type) {
      case 'region':
        return <SettlementInfoPanel cqi={cqi} />;
      case 'lord':
        return <LordInfoPanel cqi={cqi} />;
      case 'hero':
        return <HeroInfoPanel cqi={cqi} />;
      default:
        return <>nothing selected...</>;
    }
  }

  return <Panels />;
};

export default Drawer;
