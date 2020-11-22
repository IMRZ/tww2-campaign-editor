import { Action, action } from 'easy-peasy';

interface UiModel {
  activeModal: string | null;
  activeModalData: any;
  openActiveModal: Action<UiModel, [string, any]>;
  closeActiveModal: Action<UiModel, void>;
}

const ui: UiModel = {
  activeModal: null,
  activeModalData: null,
  openActiveModal: action((state, payload) => {
    const [modal, data] = payload;
    state.activeModal = modal;
    state.activeModalData = data;
  }),
  closeActiveModal: action((state, payload) => {
    state.activeModal = null;
    state.activeModalData = null;
  }),
};

export default ui;
