import { Action, action } from 'easy-peasy';

interface TooltipModel {
  current: React.ReactElement | null;
  setTooltip: Action<TooltipModel, React.ReactElement | null>;
  updateTooltip: Action<TooltipModel, React.ReactElement>;
}

const tooltip: TooltipModel = {
  current: null,
  setTooltip: action((state, payload) => {
    state.current = payload;
  }),
  updateTooltip: action((state, payload) => {
    if (state.current) {
      state.current = payload;
    }
  }),
};

export default tooltip;
