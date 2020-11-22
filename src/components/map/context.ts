import { createContext, useContext, useMemo } from 'react';
import L from 'leaflet';

type MapContextState = React.MutableRefObject<{
  map?: L.Map;
  bounds: L.LatLngBoundsLiteral;
}>;

export const MapContext = createContext<MapContextState | null>(null);

export function useMapContext() {
  const context = useContext(MapContext);

  const state = useMemo(() => {
    return {
      get map(): L.Map {
        return context?.current.map!;
      },
      get bounds(): L.LatLngBoundsLiteral {
        return context?.current.bounds!;
      },
    };
  }, [context]);

  return state;
}
