import React, { memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core';
import { createPortalIcon } from '../map/utils';
import { useFaction, useCampaignMap } from '../../use/common';
import { useStoreActions } from '../../store';
import city_schem_frame_major from './city_schem_frame_major.png';
import assets from '../../assets';

const useStyles = makeStyles({
  marker: {
    width: 72,
    height: 58,
    flexShrink: 0,
    backgroundImage: `url("${city_schem_frame_major}")`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    transform: 'scale(0.75)',
  }
});

const SettlementMapMarker = memo((props: any) => {
  const { layer, x, y, owningFaction, cqi } = props;

  const iconRef = React.useRef<any>(createPortalIcon());

  const campaign = useCampaignMap();

  useEffect(() => {
    const m = L.marker(campaign.toMapLatLng([y, x]), { icon: iconRef.current });
    m.setZIndexOffset(40);
    m.addTo(layer);

    return () => {
      m.removeFrom(layer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ReactDOM.createPortal(<Marker cqi={cqi} owningFaction={owningFaction} />, iconRef.current.getElement());
});

const Marker = memo((props: any) => {
  const classes = useStyles();

  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);
  const onClick = () => setSelectedObject(['region', props.cqi]);

  const faction = useFaction(props.owningFaction);

  const flagPath = faction
    ? `${faction.flagPath}\\mon_rotated`
    : props.owningFaction === 'rebels'
      ? 'ui\\flags\\abandoned\\mon_rotated'
      : 'ui\\flags\\_unknown_\\mon_rotated';
  // @ts-ignore
  const flag = assets[flagPath].default;

  return (
    <div className={classes.marker} onContextMenu={(e) => e.preventDefault()}>
      <img src={flag} alt="" className={classes.flag} onClick={onClick} />
    </div>
  );
});

export default SettlementMapMarker;
