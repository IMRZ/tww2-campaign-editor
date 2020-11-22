import React from 'react';
import L from 'leaflet';
import { useMapContext } from '../map/context';
import SettlementMapMarker from './SettlementMapMarker';

type MapMarkerLayerProps = {
  regions: any[];
  regionOwners: Record<string, any>;
};

const SettlementMapLayer = (props: MapMarkerLayerProps) => {
  const context = useMapContext();

  const [layer, setLayer] = React.useState<L.Layer>();

  const { regions, regionOwners } = props;

  React.useEffect(() => {
    const { map } = context;
    const layer = L.layerGroup([]);
    map.addLayer(layer);
    setLayer(layer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!layer) {
    return null;
  }

  const markers = regions.map((region) => (
    <SettlementMapMarker
      layer={layer}
      key={region.cqi}
      cqi={region.cqi}
      x={region.settlement.x}
      y={region.settlement.y}
      owningFaction={regionOwners[region.key]}
    />
  ));

  return <>{markers}</>;
};

export default SettlementMapLayer;
