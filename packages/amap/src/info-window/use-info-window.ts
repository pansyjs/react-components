/// <reference types="../types" />

import { useState, useMemo, useEffect } from 'react';
import { InfoWindowProps } from './info-window';
import { useEventProperties, useSetProperties } from '../hooks';
import { Keys } from '../types/global';
import { toLnglat } from '../utils';

export interface UseInfoWindow extends InfoWindowProps {};

const properties = [
  'content',
  'anchor',
  'size'
];

// AMap.InfoWindow.EventMap
const eventNames: Keys<AMap.InfoWindowEventMap>[] = [
  'onOpen',
  'onClose',
  'onChange'
]

const useInfoWindow = (props = {} as UseInfoWindow) => {
  const { map, visible, ...other } = props;
  const [isOpen, setIsOpen] = useState(visible);
  const [infoWindow, setInfoWindow] = useState<AMap.InfoWindow>();

  const position = toLnglat(props.position as AMap.LngLat);

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
    if (isOpen !== visible && infoWindow && map) {
      setIsOpen(visible);
      if (visible) {
        const positionCenter = map.getCenter();
        infoWindow.open(map, position || positionCenter);
      } else {
        infoWindow.close();
      }
    }
  }, [visible, infoWindow]);

  useSetProperties<AMap.InfoWindow, UseInfoWindow>(infoWindow!, props, properties);
  useEventProperties<AMap.InfoWindow, UseInfoWindow>(infoWindow!, props, eventNames);

  return {
    infoWindow, setInfoWindow,
  };
}

export default useInfoWindow;
