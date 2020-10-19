import { useState, useEffect } from 'react';
import { RectangleProps } from './rectangle';
import { useVisible, useEventProperties, useSetProperties } from '../hooks';
import { Keys } from '../types/global';

export interface UseRectangle extends RectangleProps {};

const properties: string[] = [
  'bounds',
  'options',
  'map',
  'extData'
];

const eventNames: string[] = [

]

const useRectangle = (props = {} as UseRectangle) => {
  const { map, visible, ...other } = props;
  const [rectangle, setRectangle] = useState<AMap.Rectangle>();

  useEffect(() => {
    if (!rectangle && AMap && map) {
      let instance: AMap.Rectangle = new AMap.Rectangle({ ...other });
      map.add(instance);
      setRectangle(instance);
      return () => {
        if (instance) {
          map && map.remove(instance);
          setRectangle(undefined);
        }
      }
    }

    return () => {}
  }, [map]);

  useVisible(rectangle!, visible);
  useSetProperties<AMap.Rectangle, UseRectangle>(rectangle!, props, properties);
  useEventProperties<AMap.Rectangle, UseRectangle>(rectangle!, props, eventNames);

  return {
    rectangle, setRectangle,
  }
}

export default useRectangle;
