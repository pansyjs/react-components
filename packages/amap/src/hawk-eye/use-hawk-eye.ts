import { useEffect, useState } from 'react';
import { HawkEyeProps } from './hawk-eye';
import { useVisiable } from '../hooks';

export interface UseHawkEye extends HawkEyeProps {};

export function useHawkEye(props = {} as UseHawkEye) {
  const [hawkEye, setHawkEye] = useState<AMap.HawkEye>();
  const { map, offset, visiable, ...other } = props;

  useEffect(() => {
    if (map && !hawkEye) {
      let instance: AMap.HawkEye;
      map.plugin(['AMap.HawkEye'], () => {
        instance = new AMap.HawkEye({ offset: offset, ...other });
        map.addControl(instance);
        setHawkEye(instance);
      });

      return () => {
        if (instance && map) {
          map.removeLayer(instance);
          setHawkEye(undefined);
        }
      }
    }

    return () => {}
  }, [map]);

  useVisiable(hawkEye!, visiable);

  return {
    hawkEye, setHawkEye,
  };
}

export default useHawkEye;
