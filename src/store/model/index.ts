import game from './game';
import ui from './ui';

export const storeModel = {
  game,
  ui,
};

export type StoreModel = typeof storeModel;

export default storeModel;
