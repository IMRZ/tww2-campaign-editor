import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core';
import { createPortalIcon } from '../map/utils';
import { useCommand } from '../../use/command';
import { useFaction, useCampaignMap } from '../../use/common';
import { useStoreActions } from '../../store';
import LordMapTooltip from './LordMapTooltip';
import army_schematic_frame  from './army_schematic_frame.png';
import assets from '../../assets/flags';

const useStyles = makeStyles({
  marker: {
    width: 46,
    height: 54,
    flexShrink: 0,
    backgroundImage: `url("${army_schematic_frame}")`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateY(-27px)'
  },
  flag: {
    marginTop: 12,
    width: 32,
    height: 32,
  }
});

const LordMapMarker = memo((props: any) => {
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

    marker.addEventListener('dragend', () => {
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

  return ReactDOM.createPortal(<LordMapMarkerIcon char={char} />, domElement);
}, (prevProps: any, nextProps: any) => {
  return prevProps.char.x === nextProps.char.x && prevProps.char.y === nextProps.char.y && prevProps.char.faction === nextProps.char.faction;
});

const LordMapMarkerIcon = (props: any) => {
  const classes = useStyles();

  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);
  const onClick = () => setSelectedObject(['lord', props.char.cqi]);

  const faction = useFaction(props.char.faction);
  const flagPath = `${faction.flagPath}\\mon_64`;
  // @ts-ignore
  const flag = assets[flagPath] ? assets[flagPath].default : assets['ui\\flags\\unknown\\mon_64'].default;

  return (
    <LordMapTooltip char={props.char}>
      <div className={classes.marker} onClick={onClick} onContextMenu={(e) => e.preventDefault()}>
        <img src={flag} alt="" className={classes.flag} />
      </div>
    </LordMapTooltip>
  );
};

export default LordMapMarker;
