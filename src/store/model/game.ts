import { Action, action, Thunk, thunk } from 'easy-peasy';
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

  setCampaign: Action<GameModel, any>;
  init: Action<GameModel, any>;

  requestHandle: any;
  responseHandle: any;
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

  setCampaign: action((state, payload) => {
    state.campaign = payload.campaignName;
  }),

  init: action((state, payload) => {
    state.requestHandle = payload.requestHandle;
    state.responseHandle = payload.responseHandle;
  }),

  requestHandle: null,
  responseHandle: null,
  queueCommand: thunk(async (actions, payload, { getState }) => {
    const { requestHandle, responseHandle } = getState();
    const result = await queue.add(() => commandWorker.doRequest(requestHandle, responseHandle, payload));
    return result;
  }),
};

export default game;
