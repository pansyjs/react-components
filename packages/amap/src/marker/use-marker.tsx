/// <reference types="../types" />

import { useState, useEffect, useMemo, useRef } from 'react';
import { render } from 'react-dom'
import { MarkerProps } from './marker';
import { useVisible, useEventProperties, useSetProperties } from '../hooks';
import { Keys } from '../types/global';
import { toLnglat } from '../utils';
import { renderMarkerComponent } from '../utils/marker';

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
const eventNames: Keys<AMap.MarkerEventMap>[] = [
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
  const { map, AMap, visible, onCreated, ...rest } = props;
  const contentWrapper = useRef<HTMLDivElement>();
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
      instance.render = (function(marker) {
        return function(component: React.ReactNode) {
          renderMarkerComponent(component, marker)
        }
      })(instance);

      if (('render' in props) || ('children' in props && props.children)) {
        contentWrapper.current = document.createElement('div')
        instance.setContent(contentWrapper.current)
        if ('className' in props && props.className) {
          contentWrapper.current.className = props.className
        }
      }
      setChildComponent(props, instance);

      map.add(instance);
      onCreated?.(instance);
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

  const setChildComponent = (props: MarkerProps, marker: AMap.Marker) => {
    if (contentWrapper.current) {
      if ('className' in props && props.className) {
        contentWrapper.current.className = props.className
      }
      if ('render' in props) {
        renderMarkerComponent(props.render, marker)
      } else if ('children' in props) {
        const child = props.children
        const childType = typeof child
        if (childType !== 'undefined' && contentWrapper.current) {
          render(<div>{child}</div>, contentWrapper.current)
        }
      }
    }
  }

  useVisible(marker!, visible);
  useSetProperties<AMap.Marker, UseMarker>(marker!, { ...props, position: position as AMap.LngLat }, properties);
  useEventProperties<AMap.Marker, UseMarker>(marker!, props, eventNames);

  return {
    marker, setMarker,
  }
}

export default useMarker;
