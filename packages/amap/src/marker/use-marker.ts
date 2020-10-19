import { useState, useEffect, useCallback, useMemo } from 'react';
import { MarkerProps } from './marker';
import { useVisible, useEventProperties, useSetProperties } from '../hooks';
import { Keys, MarkerEventMap } from '../types/global';
import { toLnglat } from '../utils';

export interface UseMarker extends MarkerProps {}

const properties: string[] = [
  'path',
  'anchor',
  'offset',
  'animation',
  'clickable',
  'position',
  'angle',
  'label',
  'zIndex',
  'icon',
  'draggable',
  'cursor',
  'content',
  'map',
  'title',
  'top',
  'shadow',
  'shape',
  'extData'
];

// AMap.Marker.EventMap
const eventNames: Keys<MarkerEventMap>[] = [
  'onClick',
  'onDblClick',
  'onRightClick',
  'onMouseMove',
  'onMouseOver',
  'onMouseOut',
  'onMouseDown',
  'onMouseUp',
  'onDragStart',
  'onDragging',
  'onDragEnd',
  'onMoving',
  'onMoveEnd',
  'onMoveAlong',
  'onTouchStart',
  'onTouchMove',
  'onTouchEnd'
];

const useMarker = (props = {} as UseMarker) => {
  const { map, AMap, visible, ...rest } = props;
  const [marker, setMarker] = useState<AMap.Marker>();

  const position = useMemo(
    () => {
      return toLnglat(props?.position as AMap.LngLat)
    },
    [props?.position]
  );

  useEffect(() => {
    if (!marker && AMap && map) {
      const instance = new AMap.Marker({ ...rest, position });
      map.add(instance);
      setMarker(instance);

      return () => {
        if (instance) {
          map.remove(instance);
          setMarker(undefined);
        }
      }
    }

    return () => {}
  }, [map]);

  useVisible(marker!, visible);
  useSetProperties<AMap.Marker, UseMarker>(marker!, { ...props, position: position as AMap.LngLat }, properties);
  useEventProperties<AMap.Marker, UseMarker>(marker!, props, eventNames);

  return {
    marker, setMarker,
  }
}

export default useMarker;
