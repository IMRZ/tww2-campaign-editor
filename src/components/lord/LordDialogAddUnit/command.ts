import { useCallback } from 'react';
import { useStoreActions } from '../../../store';

interface GrantUnitToCharacterArgs {
  readonly cqi: string;
  readonly unit: string;
}

export function useCommand() {
  const queueCommand = useStoreActions((actions) => actions.game.queueCommand);

  const grantUnitToCharacter = useCallback((args: GrantUnitToCharacterArgs) => {
    const type = 'grant_unit_to_character';
    return queueCommand({ ...args, type });
  }, [queueCommand]);

  return {
    grantUnitToCharacter
  };
}
