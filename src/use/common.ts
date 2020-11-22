import { useMemo } from 'react';
import { useStoreState } from '../store';
import { queryCache } from 'react-query';
import campaigns from '../data/campaigns';


export function useFaction(factionKey: string) {
  const faction = useMemo(() => {
    const factions = queryCache.getQueryData('get_factions_init') as any;

    return factions[factionKey];
  }, [factionKey]);

  return faction;
}

export function useCampaignMap() {
  const campaign = useStoreState((state) => state.game.campaign) as string;

  return useMemo(() => {
    const { image, game } = campaigns[campaign];

    return {
      campaign,
      image,
      game,
      toMapLatLng([y, x]: L.LatLngTuple): L.LatLngTuple {
        return [y * (image.height / game.height), x * (image.width / game.width)];
      },
      fromMapLatLng([y, x]: L.LatLngTuple): L.LatLngTuple {
        return [y / (image.height / game.height), x / (image.width / game.width)];
      },
    };
  }, [campaign]);
}
