/// <reference types="../types" />

import { useState, useEffect } from 'react';
import { CircleMarkerProps } from './circle-marker';
import { useVisible, useEventProperties, useSetProperties } from '../hooks';
import { Keys } from '../types/global';
import { toLnglat } from '../utils';

export interface UseCircleMarker extends CircleMarkerProps {}

const properties: string[] = [
  'center',
  'raius',
  'zIndex',
  'bubble',
  'cursor',
  'strokeColor',
  'strokeOpacity',
  'strokeWeight',
  'fillColor',
  'fillOpacity',
  'draggable',
  'extData'
];

// AMap.InfoWindow.EventMap
const eventNames: Keys<AMap.InfoWindowEventMap>[] = []

const useCircleMarker = (props = {} as UseCircleMarker) => {
  const { map, visible, center, ...rest } = props;
  const [circleMarker, setCircleMarker] = useState<AMap.CircleMarker>();

  const lnglat = toLnglat(center as AMap.PositionType);

  useEffect(() => {
    if (!circleMarker && AMap && map) {
      let instance: AMap.CircleMarker = new AMap.CircleMarker({ ...rest, center: lnglat });
      map.add(instance);
      setCircleMarker(instance);
      return () => {
        if (instance) {
          map && map.remove(instance);
          setCircleMarker(undefined);
        }
      }
    }
    return () => {}
  }, [map]);

  useVisible(circleMarker!, visible);
  useSetProperties<AMap.CircleMarker, UseCircleMarker>(circleMarker!, props, properties);
  useEventProperties<AMap.CircleMarker, UseCircleMarker>(circleMarker!, props, eventNames);

  return {
    circleMarker, setCircleMarker,
  }
}

export default useCircleMarker;
