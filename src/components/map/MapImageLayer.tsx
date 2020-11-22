import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { useMapContext } from '../map/context';

import MapContextMenu from '../global/MapContextMenu';

type MapImageLayerProps = {
  image: string;
};

const MapImageLayer = (props: MapImageLayerProps) => {
  const context = useMapContext();

  const [state, setState] = useState<any>();
  const onContextMenu = (e: any) => setState(e);
  const onClose = () => setState(null);

  useEffect(() => {
    const { map, bounds } = context;
    const imageOverlay = L.imageOverlay(props.image, bounds, { interactive: true });

    imageOverlay.on('contextmenu', (e) => {
      onContextMenu(state ? null : e);
    });

    map.addLayer(imageOverlay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <MapContextMenu state={state} onClose={onClose} />;
};

export default MapImageLayer;
