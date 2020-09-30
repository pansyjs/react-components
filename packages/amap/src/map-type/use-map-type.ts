import { useEffect, useState } from 'react';
import { MapTypeProps } from './map-type';
import { useVisiable } from '../hooks';

export interface UseMapType extends MapTypeProps {}

function useMapType(props = {} as UseMapType) {
  const [mapType, setMapType] = useState<AMap.MapType>();
  const { map, visiable, defaultType = 0, ...other } = props;

  useEffect(() => {
    if (map && !mapType) {
      let instance: AMap.MapType;
      map.plugin(['AMap.MapType'], () => {
        instance = new AMap.MapType({ defaultType, ...other });
        map.addControl(instance);
        setMapType(instance);
      });

      return () => {
        if (instance) {
          map.removeControl(instance);
        }
      }
    }

    return () => {};
  }, [map]);

  useVisiable(mapType!, visiable);

  return {
    mapType, setMapType,
  };
}

export default useMapType;
