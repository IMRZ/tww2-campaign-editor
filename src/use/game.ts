import { useCallback } from 'react';
import { useStoreState, useStoreActions } from '../store';
import { initHandles } from '../api/file';
import { useCommand } from '../use/command';
import { useFetchQuery } from './util';

// import campaigns from '../data/campaigns';

export function useData() {
  const campaign = useStoreState((state) => state.game.campaign);
  const command = useCommand();

  const init = useStoreActions((actions) => actions.game.init);
  const setCampaign = useStoreActions((actions) => actions.game.setCampaign);

  const fetchFactions = useFetchQuery('get_factions_init');
  const fetchRegions = useFetchQuery('get_regions_init');
  const fetchRegionOwners = useFetchQuery('get_regions');

  const start = useCallback(async () => {
    if (!campaign) {
      try {
        const handles = await initHandles();

        init(handles);

        await fetchFactions();
        await fetchRegions();
        await fetchRegionOwners();

        await command.getGameInfo()
          .then((r: any) => setCampaign(r.result))
          .catch((e: any) => console.log(e));
      } catch (e) {
        console.log(e);
        alert('Failed to exchange data with the game! The game is not running with the mod enabled or you have selected the wrong folder.');
      }
    }
  }, [campaign, init, fetchFactions, fetchRegions, fetchRegionOwners, command, setCampaign]);

  return {
    start,
    campaign,
  };
}
