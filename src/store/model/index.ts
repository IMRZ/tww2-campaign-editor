import game from './game';
import ui from './ui';
import tooltip from './tooltip';

export const storeModel = {
  game,
  ui,
  tooltip,
};

export type StoreModel = typeof storeModel;

export default storeModel;
