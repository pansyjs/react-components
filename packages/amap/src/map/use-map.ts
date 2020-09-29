import { useEffect, useState } from 'react';
import { MapProps } from './map';
import { useSetStatus, useSetProperties, useEventProperties } from '../hooks';
import { Keys } from '../types/global';

interface UseMap extends MapProps {
  /**
   * 指定的容器
   */
  container?: HTMLDivElement;
}

interface UseMapResult {
  map: AMap.Map,
  setContainer: any
}

const mapStatus: Keys<AMap.Map.Status>[] = [
  'animateEnable',
  'doubleClickZoom',
  'dragEnable',
  'isHotspot',
  'jogEnable',
  'keyboardEnable',
  'pitchEnable',
  'resizeEnable',
  'rotateEnable',
  'scrollWheel',
  'touchZoom',
  'zoomEnable'
];

const properties: string[] = [
  // 'zoom', zoom 已单独实现，无需设置
  'labelzIndex',
  'layers',
  'center',
  'city',
  'bounds',
  'limitBounds',
  'lang',
  'rotation',
  'defaultCursor',
  'mapStyle',
  'features',
  'defaultLayer',
  'pitch'
];

// AMap.Map.EventMap
const eventNames: Keys<AMap.MapEventMap>[] = [
  'onClick',
  'onDblClick',
  'onRightClick',
  'onRdblclick',
  'onMouseUp',
  'onMouseDown',
  'onMouseMove',
  'onMouseWheel',
  'onMouseOver',
  'onMouseOut',
  'onTouchStart',
  'onTouchMove',
  'onTouchEnd',
  'onContextMenu',
  'onHotspotClick',
  'onHotspotOver',
  'onHotspotOut',
  'onComplete',
  'onMapMove',
  'onMoveStart',
  'onMoveEnd',
  'onZoomChange',
  'onZoomStart',
  'onZoomEnd',
  'onDragStart',
  'onDragging',
  'onDragEnd',
  'onResize'
]

// type Properties = FunctionKeys<AMap.Map>

const useMap = (props: UseMap = {}): UseMapResult => {
  const [mapInstance, setMapInstance] = useState<AMap.Map>();
  const [zoom, setZoom] = useState(props.zoom || 15);
  const [container, setContainer] = useState<HTMLDivElement>(props.container as HTMLDivElement);

  useEffect(
    () => {
      if (container && !mapInstance && window.AMap) {
        setMapInstance(new AMap.Map(container, { zoom, ...props }));
      }

      return () => {
        if (mapInstance) {
          mapInstance.destroy();
        }
      }
    },
    [container]
  );

  useEffect(() => {
    if (
      mapInstance &&
      typeof props.zoom === 'number' &&
      zoom !== props.zoom &&
      props.zoom >= 2 && props.zoom <= 20
    ) {
      setZoom(props.zoom);
      mapInstance.setZoom(props.zoom);
    }
  }, [zoom, props.zoom]);

  // 设置地图状态
  useSetStatus<AMap.Map.Status, AMap.Map, UseMap>(mapInstance!, props, mapStatus);
  // 设置地图受控属性
  useSetProperties<AMap.Map, UseMap>(mapInstance!, props, properties);
  // 绑定事件
  useEventProperties<AMap.Map, UseMap>(mapInstance!, props, eventNames);

  return {
    map: mapInstance as AMap.Map,
    setContainer,
  }
}

export default useMap;
