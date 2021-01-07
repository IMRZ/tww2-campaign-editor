import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core';
import { createPortalIcon } from '../map/utils';
import { useCommand } from '../../use/command';
import { useFaction, useCampaignMap } from '../../use/common';
import { useStoreActions } from '../../store';
import HeroMapTooltip from './HeroMapTooltip';
import assets from '../../assets/flags';

const useStyles = makeStyles({
  marker: {
    width: 24,
    height: 24,
    flexShrink: 0,
  }
});

const HeroMapMarker = React.memo((props: any) => {
  const { layer, char } = props;
  const [domElement, setDomElement] = React.useState<any>();
  const markerRef = React.useRef<any>();
  const dragTimeoutFn = React.useRef<any>();

  const command = useCommand();
  const campaign = useCampaignMap();

  React.useEffect(() => {
    const { x, y } = char;
    const icon = createPortalIcon();
    const draggable = true;
    const marker = L.marker(campaign.toMapLatLng([y, x]), { icon, draggable });
    const el = icon.getElement();

    marker.setZIndexOffset(50);
    marker.addTo(layer);
    setDomElement(el);
    markerRef.current = marker;

    marker.addEventListener('dragend', (e) => {
      const { lat, lng } = marker.getLatLng();
      const [cY, cX] = campaign.fromMapLatLng([Math.round(lat), Math.round(lng)])

      command.teleport(char.cqi, cX, cY)
        .then((res: any) => {
          const response = res.result;
          marker.setLatLng(campaign.toMapLatLng([response.y, response.x]));
        })
        .catch((e: any) => {
          console.log(e);
          marker.setLatLng(campaign.toMapLatLng([y, x]));
        });
    });

    return () => {
      marker.removeFrom(layer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (markerRef.current) {
      const marker = markerRef.current;
      marker.setLatLng(campaign.toMapLatLng([char.y, char.x]));
      clearTimeout(dragTimeoutFn.current);
    }
  }, [campaign, char.x, char.y]);

  if (!domElement) {
    return null;
  }

  return ReactDOM.createPortal(<HeroMapMarkerIcon char={char} />, domElement);
}, (prevProps: any, nextProps: any) => {
  return prevProps.char.x === nextProps.char.x && prevProps.char.y === nextProps.char.y && prevProps.char.faction === nextProps.char.faction;
});

const HeroMapMarkerIcon = (props: any) => {
  const classes = useStyles();

  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);
  const onClick = () => setSelectedObject(['hero', props.char.cqi]);

  const faction = useFaction(props.char.faction);
  const flagPath = `${faction.flagPath}\\mon_24`;
  // @ts-ignore
  const flag = assets[flagPath] ? assets[flagPath].default : assets['ui\\flags\\unknown\\mon_24'].default;

  return (
    <HeroMapTooltip char={props.char}>
      <img src={flag} alt="" className={classes.marker} onClick={onClick} onContextMenu={(e) => e.preventDefault()} />
    </HeroMapTooltip>
  );
};

export default HeroMapMarker;
