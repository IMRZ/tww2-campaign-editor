import { useQueryInterval } from '../use/util';

const FactionQueryInterval = () => {
  useQueryInterval('get_factions', {});

  return null;
};

export default FactionQueryInterval;
