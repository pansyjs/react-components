/// <reference types="../types" />

import { useState, useEffect, useMemo } from 'react';
import { PolygonProps } from './polygon';
import { useVisible, useEventProperties, useSetProperties } from '../hooks';
import { toLnglat } from '../utils';
import { Keys } from '../types/global';

export interface UsePolygon extends PolygonProps {}

const properties: string[] = [
  'path',
  'extData'
];

export const eventNames: Keys<AMap.PolygonEventMap>[] = [
  /**
   * 隐藏
   */
  'onHide',
  /**
   * 显示
   */
  'onShow',
  /**
   * 鼠标左键单击事件
   */
  'onClick',
  /**
   * 鼠标左键双击事件
   */
  'onDblClick',
  /**
   * 鼠标右键单击事件
   */
  'onRightClick',
  /**
   * 鼠标按下
   */
  'onMouseDown',
  /**
   * 鼠标抬起
   */
  'onMouseUp',
  /**
   * 鼠标经过
   */
  'onMouseOver',
  /**
   * 鼠标移出
   */
  'onMouseOut',
  /**
   * 触摸开始时触发事件，仅适用移动设备
   */
  'onTouchStart',
  /**
   * 触摸移动进行中时触发事件，仅适用移动设备
   */
  'onTouchMove',
  /**
   * 触摸结束时触发事件，仅适用移动设备
   */
  'onTouchEnd',
]

const usePolygon = (props = {} as UsePolygon) => {
  const { map, visible, ...other } = props;
  const [polygon, setPolygon] = useState<AMap.Polygon>();

  const path = useMemo(
    () => {
      // @ts-ignore
      return props.path?.map((item: AMap.LngLat) => toLnglat(item))
    },
    [JSON.stringify(props.path)]
  )

  useEffect(() => {
    if (!polygon && AMap && map) {
      let instance: AMap.Polygon = new AMap.Polygon({ ...other, path });
      map.add(instance);
      setPolygon(instance);
      return () => {
        if (instance) {
          map && map.remove(instance);
          setPolygon(undefined);
        }
      }
    }
    return () => {}
  }, [map]);

  useVisible(polygon!, visible);
  useSetProperties<AMap.Polygon, UsePolygon>(polygon!, props, properties);
  useEventProperties<AMap.Polygon, UsePolygon>(polygon!, props, eventNames);

  return {
    polygon, setPolygon,
  }
}

export default usePolygon;
