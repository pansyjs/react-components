/// <reference types="../types" />

import { useState, useEffect } from 'react';
import { PolygonProps } from './polygon';
import { useVisible, useEventProperties, useSetProperties } from '../hooks';
import { Keys } from '../types/global';

export interface UsePolygon extends PolygonProps {}

const properties: string[] = [
  'path',
  'extData'
];

// AMap.Circle.EventMap
const eventNames: Keys<AMap.AutoCompleteEventMap>[] = [

]


const usePolygon = (props = {} as UsePolygon) => {
  const { map, visible, ...other } = props;
  const [polygon, setPolygon] = useState<AMap.Polygon>();
  useEffect(() => {
    if (!polygon && AMap && map) {
      let instance: AMap.Polygon = new AMap.Polygon({ ...other });
      map.add(instance);
      setPolygon(instance);
      return () => {
        if (instance) {
          map && map.remove(instance);
          setPolygon(undefined);
        }
      }
    }
    return () => {}
  }, [map]);

  useVisible(polygon!, visible);
  useSetProperties<AMap.Polygon, UsePolygon>(polygon!, props, properties);
  useEventProperties<AMap.Polygon, UsePolygon>(polygon!, props, eventNames);

  return {
    polygon, setPolygon,
  }
}

export default usePolygon;
