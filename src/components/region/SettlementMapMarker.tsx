import React, { memo, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core';
import { createPortalIcon } from '../map/utils';
import { useFaction, useCampaignMap } from '../../use/common';
import { useStoreActions } from '../../store';
import city_schem_frame_major from './city_schem_frame_major.png';
import assets from '../../assets/flags';
import SettlementMapTooltip from './SettlementMapTooltip';

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
  const { layer, region, owningFaction } = props;
  const [portalIcon] = useState<any>(createPortalIcon());
  const campaign = useCampaignMap();

  useEffect(() => {
    const { x, y } = region.settlement;
    const marker = L.marker(campaign.toMapLatLng([y, x]), { icon: portalIcon });
    marker.setZIndexOffset(40);
    marker.addTo(layer);

    return () => {
      marker.removeFrom(layer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ReactDOM.createPortal(
    <SettlementMapMarkerIcon region={region} owningFaction={owningFaction} />,
    portalIcon.getElement(),
  );
}, (prevProps: any, nextProps: any) => {
  // only rerender when owningFaction is changed
  return prevProps.owningFaction === nextProps.owningFaction;
});

const SettlementMapMarkerIcon = (props: any) => {
  const classes = useStyles();

  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);
  const onClick = () => setSelectedObject(['region', props.region.cqi]);

  const faction = useFaction(props.owningFaction);

  const flagPath = faction
    ? `${faction.flagPath}\\mon_rotated`
    : 'ui\\flags\\abandoned\\mon_rotated';

  // @ts-ignore
  const flag = assets[flagPath] ? assets[flagPath].default : assets['ui\\flags\\unknown\\mon_rotated'].default;

  return (
    <SettlementMapTooltip region={props.region}>
      <div className={classes.marker} onContextMenu={(e) => e.preventDefault()}>
        <img src={flag} alt="" className={classes.flag} onClick={onClick} />
      </div>
    </SettlementMapTooltip>
  );
};

export default SettlementMapMarker;
