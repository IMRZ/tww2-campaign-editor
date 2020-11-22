import { useStoreState, useStoreActions } from '../store';
import { useQuery, queryCache } from 'react-query';

export function useQueryInterval(type: string, initialData: any) {
  const ready = useStoreState((state) => !!state.game.requestHandle && !!state.game.responseHandle);
  const queueCommand = useStoreActions((actions) => actions.game.queueCommand);

  return useQuery(type, () => queueCommand({ type }).then((res: any) => res.result), {
    enabled: ready,
    initialData,
    refetchInterval: 500,
    staleTime: Infinity,
  });
}

export function useQueryData(type: string, initialData: any) {
  const ready = useStoreState((state) => !!state.game.requestHandle && !!state.game.responseHandle);
  const queueCommand = useStoreActions((actions) => actions.game.queueCommand);

  return useQuery(type, () => queueCommand({ type }).then((res: any) => res.result), {
    enabled: ready,
    initialData,
    staleTime: Infinity,
  });
}

export function useFetchQuery(type: string) {
  const queueCommand = useStoreActions((actions) => actions.game.queueCommand);
  return () => queryCache.fetchQuery(type, () => queueCommand({ type }).then((res: any) => res.result));
}
