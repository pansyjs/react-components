import { useState, useEffect } from 'react';
import { PolygonProps } from './polygon';
import { useVisiable, useEventProperties, useSetProperties } from '../hooks';
import { Keys, AutoCompleteEventMap } from '../types/global';

export interface UsePolygon extends PolygonProps {}

const properties: string[] = [
  'path',
  'extData'
];

// AMap.Circle.EventMap
const eventNames: Keys<AutoCompleteEventMap>[] = [

]


const usePolygon = (props = {} as UsePolygon) => {
  const { map, visiable, ...other } = props;
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

  useVisiable(polygon!, visiable);
  useSetProperties<AMap.Polygon, UsePolygon>(polygon!, props, properties);
  useEventProperties<AMap.Polygon, UsePolygon>(polygon!, props, eventNames);

  return {
    polygon, setPolygon,
  }
}

export default usePolygon;
