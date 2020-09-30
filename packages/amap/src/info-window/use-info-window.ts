import { useState, useMemo, useEffect } from 'react';
import { InfoWindowProps } from './info-window';
import { useEventProperties, useSetProperties } from '../hooks';
import { Keys, InfoWindowEventMap, PositionType } from '../types/global';
import { toLnglat } from '../utils';

export interface UseInfoWindow extends InfoWindowProps {};

const properties = [
  'content',
  'anchor',
  'size'
];

// AMap.InfoWindow.EventMap
const eventNames: Keys<InfoWindowEventMap>[] = [
  'onOpen',
  'onClose',
  'onChange'
]

const useInfoWindow = (props = {} as UseInfoWindow) => {
  const { map, visiable, ...other } = props;
  const [isOpen, setIsOpen] = useState(visiable);
  const [infoWindow, setInfoWindow] = useState<AMap.InfoWindow>();

  const position = toLnglat(props.position as PositionType);

  useEffect(() => {
    if (!AMap || !map) return;
    if (!infoWindow) {
      const positionCenter = map.getCenter();
      const instance: AMap.InfoWindow = new AMap.InfoWindow({ ...other, position: position || positionCenter });
      setInfoWindow(instance);
      if (isOpen) {
        instance.open(map, position || positionCenter);
      }
      return () => {
        if (instance) {
          map && map.remove(instance);
          setInfoWindow(undefined);
        }
      }
    }

    return () => {}
  }, [map]);

  useMemo(() => {
    if (isOpen !== visiable && infoWindow && map) {
      setIsOpen(visiable);
      if (visiable) {
        const positionCenter = map.getCenter();
        infoWindow.open(map, position || positionCenter);
      } else {
        infoWindow.close();
      }
    }
  }, [visiable, infoWindow]);

  useSetProperties<AMap.InfoWindow, UseInfoWindow>(infoWindow!, props, properties);
  useEventProperties<AMap.InfoWindow, UseInfoWindow>(infoWindow!, props, eventNames);

  return {
    infoWindow, setInfoWindow,
  };
}

export default useInfoWindow;
