import { useEffect, useState } from 'react';
import { ScaleProps } from './scale';
import { useVisible } from '../hooks';
import { toPixel } from '../utils';

export interface UseScale extends ScaleProps {}

function useScale(props = {} as UseScale) {
  const [scale, setScale] = useState<AMap.Scale>();
  const { map, AMap, position, visible } = props;

  useEffect(() => {
    if (map && !scale) {
      let instance: AMap.Scale;
      map.plugin(['AMap.Scale'], () => {
        const pixel = getOffset();
        instance = new AMap.Scale({
          offset: pixel,
          position
        });
        map.addControl(instance);
        setScale(instance);
      });

      return () => {
        if (instance) {
          map.removeControl(instance);
        }
      }
    }

    return () => {};
  }, [map]);

  useVisible(scale!, visible);

  const getOffset = () => {
    return toPixel(props?.offset as AMap.Pixel);
  }

  return {
    scale, setScale
  };
}

export default useScale;
