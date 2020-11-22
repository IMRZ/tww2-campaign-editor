import { useStoreState, useStoreActions } from '../store';

// TODO: remove me
export function useDrawer() {
  const activeModal = useStoreState((state) => state.ui.activeModal);
  const activeModalData = useStoreState((state) => state.ui.activeModalData);
  const openActiveModal = useStoreActions((actions) => actions.ui.openActiveModal);
  const closeActiveModal = useStoreActions((actions) => actions.ui.closeActiveModal);

  return {
    activeModal,
    activeModalData,
    openActiveModal,
    closeActiveModal
  };
}
