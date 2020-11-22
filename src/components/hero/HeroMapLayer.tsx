import React from 'react';
import L from 'leaflet';
import { useMapContext } from '../map/context';
import HeroMapMarker from './HeroMapMarker';

type HeroMapLayerProps = {
  characters: any[];
};

const HeroMapLayer = (props: HeroMapLayerProps) => {
  const context = useMapContext();

  const [layer, setLayer] = React.useState<L.Layer>();

  const { characters } = props;

  React.useEffect(() => {
    const { map } = context;
    const layer = L.layerGroup([]);
    map.addLayer(layer);
    setLayer(layer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!layer) {
    return null;
  }

  const markers = characters.map((char) => (
    <HeroMapMarker
      key={char.cqi}
      layer={layer}
      cqi={char.cqi}
      x={char.x}
      y={char.y}
      type={char.type}
      faction={char.faction}
    />
  ));

  return <>{markers}</>;
};

export default HeroMapLayer;
