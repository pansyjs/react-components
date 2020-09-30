import { useState, useEffect } from 'react';
import { RectangleProps } from './rectangle';
import { useVisiable, useEventProperties, useSetProperties } from '../hooks';
import { Keys, InfoWindowEventMap } from '../types/global';

export interface UseRectangle extends RectangleProps {};

const properties: string[] = [
  'bounds',
  'options',
  'map',
  'extData'
];

// AMap.InfoWindow.EventMap
const eventNames: Keys<InfoWindowEventMap>[] = [

]

const useRectangle = (props = {} as UseRectangle) => {
  const { map, visiable, ...other } = props;
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

  useVisiable(rectangle!, visiable);
  useSetProperties<AMap.Rectangle, UseRectangle>(rectangle!, props, properties);
  useEventProperties<AMap.Rectangle, UseRectangle>(rectangle!, props, eventNames);

  return {
    rectangle, setRectangle,
  }
}

export default useRectangle;
