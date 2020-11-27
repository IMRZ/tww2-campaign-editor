import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core';
import { createPortalIcon } from '../map/utils';
import { useCommand } from '../../use/command';
import { useFaction, useCampaignMap } from '../../use/common';
import { useStoreActions } from '../../store';

import assets from '../../assets/flags';

const useStyles = makeStyles({
  marker: {
    width: 24,
    height: 24,
    flexShrink: 0,
  }
});

const HeroMapMarker = React.memo((props: any) => {
  const { layer, cqi, x, y, faction } = props;
  const [domElement, setDomElement] = React.useState<any>();
  const markerRef = React.useRef<any>();
  const dragTimeoutFn = React.useRef<any>();

  const command = useCommand();
  const campaign = useCampaignMap();

  React.useEffect(() => {
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

      command.teleport(cqi, cX, cY)
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
      marker.setLatLng(campaign.toMapLatLng([y, x]));
      clearTimeout(dragTimeoutFn.current);
    }
  }, [campaign, x, y]);

  if (!domElement) {
    return null;
  }

  return ReactDOM.createPortal(<Marker cqi={cqi} faction={faction} />, domElement);
});

const Marker = React.memo((props: any) => {
  const classes = useStyles();

  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);
  const onClick = () => setSelectedObject(['hero', props.cqi]);

  const faction = useFaction(props.faction);
  const flagPath = `${faction.flagPath}\\mon_24`;
  // @ts-ignore
  const flag = assets[flagPath] ? assets[flagPath].default : assets['ui\\flags\\unknown\\mon_24'].default;

  return (
    <img src={flag} alt="" className={classes.marker} onClick={onClick} onContextMenu={(e) => e.preventDefault()} />
  );
});

export default HeroMapMarker;
