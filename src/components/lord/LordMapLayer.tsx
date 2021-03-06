import React from 'react';
import L from 'leaflet';
import { useMapContext } from '../map/context';
import LordMapMarker from './LordMapMarker';

type CharacterLayerProps = {
  characters: any[];
};

const CharacterLayer = (props: CharacterLayerProps) => {
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
    <LordMapMarker
      key={char.cqi}
      layer={layer}
      char={char}
    />
  ));

  return <>{markers}</>;
};

export default CharacterLayer;
