import { useCallback } from 'react';
import { useStoreActions } from '../../../store';

interface SetCharacterImmortalityArgs {
  readonly cqi: number;
  readonly isImmortal: boolean;
}

export function useCommand() {
  const queueCommand = useStoreActions((actions) => actions.game.queueCommand);

  const setCharacterImmortality = useCallback((args: SetCharacterImmortalityArgs) => {
    const type = 'set_character_immortality';
    return queueCommand({ ...args, type });
  }, [queueCommand]);

  return {
    setCharacterImmortality
  };
}
