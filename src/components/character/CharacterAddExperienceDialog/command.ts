import { useCallback } from 'react';
import { useStoreActions } from '../../../store';

interface AddAgentExperienceArgs {
  readonly cqi: string;
  readonly points: number;
}

export function useCommand() {
  const queueCommand = useStoreActions((actions) => actions.game.queueCommand);

  const addAgentExperience = useCallback((args: AddAgentExperienceArgs) => {
    const type = 'add_agent_experience';
    return queueCommand({ ...args, type });
  }, [queueCommand]);

  return {
    addAgentExperience,
  };
}
