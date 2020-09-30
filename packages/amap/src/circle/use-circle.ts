import { useState, useEffect } from 'react';
import { CircleProps } from './circle';
import { useVisiable, useEventProperties, useSetProperties } from '../hooks';
import { toLnglat } from '../utils';
import { Keys, AutoCompleteEventMap, PositionType } from '../types/global';

export interface UseCircle extends CircleProps {}

const properties: string[] = [
  'center',
  'raius',
  'options',
  'extData'
];

// AMap.Circle.EventMap
const eventNames: Keys<AutoCompleteEventMap>[] = [

]

const useCircle = (props = {} as UseCircle) => {
  const { map, visiable, center,...rest } = props;
  const [circle, setCircle] = useState<AMap.Circle>();

  const lnglat = toLnglat(center as PositionType);

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

  useVisiable(circle!, visiable);
  useSetProperties<AMap.Circle, UseCircle>(circle!, props, properties);
  useEventProperties<AMap.Circle, UseCircle>(circle!, props, eventNames);

  return {
    circle, setCircle,
  }
}

export default useCircle;
