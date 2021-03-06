import { useCallback } from 'react';
import { useStoreActions } from '../../../store';

type ModifyPooledResourceArgs = {
  readonly factionKey: string;
  readonly resource: string;
  readonly factor: string;
  readonly amount: number;
};

export function useCommand() {
  const queueCommand = useStoreActions((actions) => actions.game.queueCommand);

  const factionAddPooledResource = useCallback((args: ModifyPooledResourceArgs) => {
    const type = 'faction_add_pooled_resource';
    return queueCommand({ ...args, type });
  }, [queueCommand]);

  return {
    factionAddPooledResource
  };
}
