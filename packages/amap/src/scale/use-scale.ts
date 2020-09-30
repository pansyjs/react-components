import { useEffect, useState } from 'react';
import { ScaleProps } from './scale';
import { useVisiable } from '../hooks';

export interface UseScale extends ScaleProps {}

function useScale(props = {} as UseScale) {
  const [scale, setScale] = useState<AMap.Scale>();
  const { map, position, visiable, offset } = props;

  useEffect(() => {
    if (map && !scale) {
      let instance: AMap.Scale;
      map.plugin(['AMap.Scale'], () => {
        instance = new AMap.Scale({
          // offset,
          position
        });
        console.log(instance);
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

  useVisiable(scale!, visiable);

  return {
    scale, setScale
  };
}

export default useScale;
