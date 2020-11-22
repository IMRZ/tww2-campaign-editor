import React, { useCallback, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContext } from './context';

type MapProps = {
  children?: React.ReactNode;
  config: {
    width: number;
    height: number;
  }
};

const Map = (props: MapProps) => {
  const { children, config } = props;

  const bounds = [
    [0, 0],
    [config.height, config.width],
  ] as L.LatLngBoundsLiteral;

  const contextState = useRef({
    map: null as any,
    bounds,
  });

  const mapContainer = useCallback((el) => {
    if (el !== null) {
      const map = L.map(el, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        inertiaMaxSpeed: Infinity,
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false,
        maxBounds: bounds,
        zoomSnap: 0.25,
        zoomDelta: 0.25,
        zoomAnimation: true,
        markerZoomAnimation: true,
        wheelPxPerZoomLevel: 60,
      });

      contextState.current.map = map;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const map = contextState.current.map!;

    map.fitBounds(bounds);

    return () => {
      map.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const style: any = {
    height: '100%',
    transition: 'opacity 1s',
  };

  return (
    <div style={style}>
      <div ref={mapContainer} style={{ height: '100%', backgroundColor: 'transparent' }}>
        <MapContext.Provider value={contextState}>{children}</MapContext.Provider>
      </div>
    </div>
  );
};

export default Map;
