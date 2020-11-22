import { createStore, createTypedHooks } from 'easy-peasy';
import storeModel, { StoreModel } from './model';

const store = createStore(storeModel);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./model', () => store.reconfigure(storeModel));
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
