import React, { useMemo } from 'react';
import Map from './map/Map';
import MapImageLayer from './map/MapImageLayer';

import LordMapLayer from './lord/LordMapLayer';
import HeroMapLayer from './hero/HeroMapLayer';
import SettlementMapLayer from './region/SettlementMapLayer';

import { useQueryInterval, useQueryData } from '../use/util';
import { useCampaignMap } from '../use/common';

import CommandSpeedDial from './global/CommandSpeedDial';
import LordDialogCreate from './lord/LordDialogCreate';
import HeroDialogCreate from './hero/HeroDialogCreate';
import TreasuryModifyDialog from './global/TreasuryModifyDialog';

function Main() {
  const campaign = useCampaignMap();
  const { regions, regionOwners, activeCharacters } = useMain();

  return (
    <>
      <Map config={campaign.image}>
        <MapImageLayer image={campaign.image.map} />
        <LordMapLayer characters={activeCharacters.lords} />
        <HeroMapLayer characters={activeCharacters.heroes} />
        <SettlementMapLayer regions={regions} regionOwners={regionOwners} />
        <CommandSpeedDial />
      </Map>

      <LordDialogCreate />
      <HeroDialogCreate />
      <TreasuryModifyDialog />
    </>
  );
}

export function useMain() {
  const regionsQuery = useQueryData('get_regions_init', []);
  const regionOwnersQuery = useQueryInterval('get_regions', {});
  const charatersQuery = useQueryInterval('get_active_characters', []);

  const activeCharacters = useMemo(() => {
    return charatersQuery.data.reduce(
      (accumulator: any, char: any) => {
        if (char.type === 'general') {
          accumulator.lords.push(char);
        } else {
          accumulator.heroes.push(char);
        }

        return accumulator;
      },
      {
        lords: [],
        heroes: [],
      }
    );
  }, [charatersQuery.data]);

  const regions = useMemo(() => {
    return Object.values(regionsQuery.data);
  }, [regionsQuery.data]);

  return {
    regions,
    regionOwners: regionOwnersQuery.data,
    activeCharacters,
  };
}

export default Main;
