import { Action, action, Thunk, thunk, Computed, computed } from 'easy-peasy';
import PQueue from 'p-queue';

// @ts-ignore
import CommandWorker from 'workerize-loader!../../api/worker'; // eslint-disable-line import/no-webpack-loader-syntax

const commandWorker = new CommandWorker();
const queue = new PQueue({ concurrency: 1 });

interface GameModel {
  campaign: string | null;
  regions: any[];
  factions: Record<string, any>;
  activeCharacters: any[];

  selectedObject: [string, any] | null;
  setSelectedObject: Action<GameModel, [string, any] | null>;
  getSelected: Computed<GameModel, any>;

  requestHandle: any;
  responseHandle: any;

  setCampaign: Action<GameModel, any>;

  init: Action<GameModel, any>;
  queueCommand: Thunk<GameModel, {}>;
}

const game: GameModel = {
  campaign: null,
  regions: [],
  factions: {},
  activeCharacters: [],

  selectedObject: null,
  setSelectedObject: action((state, payload) => {
    state.selectedObject = payload;
  }),
  getSelected: computed((state) => {
    if (state.selectedObject) {
      const [type, cqi] = state.selectedObject;
      if (type === 'region') {
        return state.regions.find((region) => region.cqi === cqi);
      } if (type === 'lord' || type === 'hero') {
        return state.activeCharacters.find((char) => char.cqi === cqi);
      } else {
        return null
      }
    } else {
      return null;
    }
  }),

  requestHandle: null,
  responseHandle: null,

  setCampaign: action((state, payload) => {
    state.campaign = payload.campaignName;
  }),

  init: action((state, payload) => {
    state.requestHandle = payload.requestHandle;
    state.responseHandle = payload.responseHandle;
  }),

  queueCommand: thunk(async (actions, payload, { getState }) => {
    const { requestHandle, responseHandle } = getState();
    const result = await queue.add(() => commandWorker.doRequest(requestHandle, responseHandle, payload));
    return result;
  }),
};

export default game;
