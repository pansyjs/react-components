/// <reference types="../types" />

import { useState, useEffect, useMemo } from 'react';
import { PolygonProps } from './polygon';
import { useVisible, useEventProperties, useSetProperties } from '../hooks';
import { Keys } from '../types/global';
import { toLnglat } from '../utils';

export interface UsePolygon extends PolygonProps {}

const properties: string[] = [
  'path',
  'extData'
];

const eventNames: string[] = []

const usePolygon = (props = {} as UsePolygon) => {
  const { map, visible, ...other } = props;
  const [polygon, setPolygon] = useState<AMap.Polygon>();

  const path = useMemo(
    () => {
      // @ts-ignore
      return props.path?.map((item: AMap.LngLat) => toLnglat(item))
    },
    [JSON.stringify(props.path)]
  )

  useEffect(() => {
    if (!polygon && AMap && map) {
      let instance: AMap.Polygon = new AMap.Polygon({ ...other, path });
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
