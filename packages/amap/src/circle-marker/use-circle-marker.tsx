import { useState, useEffect } from 'react';
import { CircleMarkerProps } from './circle-marker';
import { useVisiable, useEventProperties, useSetProperties } from '../hooks';
import { Keys, InfoWindowEventMap, PositionType } from '../types/global';
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
const eventNames: Keys<InfoWindowEventMap>[] = []

const useCircleMarker = (props = {} as UseCircleMarker) => {
  const { map, visiable, center, ...rest } = props;
  const [circleMarker, setCircleMarker] = useState<AMap.CircleMarker>();

  const lnglat = toLnglat(center as PositionType);

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

  useVisiable(circleMarker!, visiable);
  useSetProperties<AMap.CircleMarker, UseCircleMarker>(circleMarker!, props, properties);
  useEventProperties<AMap.CircleMarker, UseCircleMarker>(circleMarker!, props, eventNames);

  return {
    circleMarker, setCircleMarker,
  }
}

export default useCircleMarker;
