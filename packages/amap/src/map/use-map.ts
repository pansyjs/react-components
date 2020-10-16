import { useEffect, useState } from 'react';
import { MapProps } from './map';
import { useSetStatus, useSetProperties, useEventProperties } from '../hooks';
import { Keys, MapEventMap } from '../types/global';
import AMapLoader from '../utils/api-loader';
import { toLnglat } from '../utils';

interface UseMap extends MapProps {
  /**
   * 指定的容器
   */
  container?: HTMLDivElement;
  options?: MapProps['options'];
}

interface UseMapResult {
  map: AMap.Map,
  AMap: typeof window.AMap;
  loaded: boolean;
  setContainer: React.Dispatch<React.SetStateAction<HTMLDivElement>>;
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
const eventNames: Keys<MapEventMap>[] = [
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
];

const useMap = (props: UseMap = {}): UseMapResult => {
  const [loaded, setLoaded] = useState<boolean>(true);
  const [mapInstance, setMapInstance] = useState<AMap.Map>();
  const [Amap, setAMap] = useState<typeof AMap>();
  const [zoom, setZoom] = useState(props.zoom || 15);
  const [container, setContainer] = useState<HTMLDivElement>(props.container as HTMLDivElement);

  useEffect(
    () => {
      if (!mapInstance && container) {
        new AMapLoader()
          .load(props.options)
          .then((AMap) => {
            setAMap(AMap);
            setLoaded(false);
            setMapInstance(new AMap.Map(container, { zoom, ...props } as AMap.Map.Options));
          })
      }

      return () => {
        if (mapInstance) {
          mapInstance.destroy();
        }
      }
    },
    [props.container, props.options, mapInstance]
  );

  useEffect(
    () => {
      if (
        mapInstance &&
        typeof props.zoom === 'number' &&
        zoom !== props.zoom &&
        props.zoom >= 2 && props.zoom <= 20
      ) {
        setZoom(props.zoom);
        mapInstance.setZoom(props.zoom);
      }
    },
    [zoom, props.zoom]
  );

  const center = Amap && toLnglat(props?.center as AMap.LngLat);

  // 设置地图状态
  useSetStatus<AMap.Map.Status, AMap.Map, UseMap>(mapInstance!, props, mapStatus);
  // 设置地图受控属性
  useSetProperties<AMap.Map, UseMap>(mapInstance!, { ...props, center }, properties);
  // 绑定事件
  useEventProperties<AMap.Map, UseMap>(mapInstance!, props, eventNames);

  return {
    map: mapInstance as AMap.Map,
    AMap: Amap as typeof AMap,
    loaded,
    setContainer,
  }
}

export default useMap;
