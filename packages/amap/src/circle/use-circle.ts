/// <reference types="../types" />

import { useState, useEffect } from 'react';
import { CircleProps } from './circle';
import { useVisible, useEventProperties, useSetProperties } from '../hooks';
import { toLnglat } from '../utils';
import { Keys } from '../types/global';

export interface UseCircle extends CircleProps {}

const properties: string[] = [
  'center',
  'raius',
  'options',
  'extData'
];

// AMap.Circle.EventMap
const eventNames: string[] = [

]

const useCircle = (props = {} as UseCircle) => {
  const { map, visible, center,...rest } = props;
  const [circle, setCircle] = useState<AMap.Circle>();

  const lnglat = toLnglat(center as AMap.LngLat);

  useEffect(() => {
    if (AMap && map && !circle) {
      let instance: AMap.Circle = new AMap.Circle({ ...rest, center: lnglat });
      map.add(instance);
      setCircle(instance);
    }
    return () => {
      if (circle) {
        map && map.remove(circle);
        setCircle(undefined);
      }
    }
  }, [map]);

  useVisible(circle!, visible);
  useSetProperties<AMap.Circle, UseCircle>(circle!, props, properties);
  useEventProperties<AMap.Circle, UseCircle>(circle!, props, eventNames);

  return {
    circle, setCircle,
  }
}

export default useCircle;
