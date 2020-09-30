import React from 'react';
import ReactDOM from 'react-dom';
import { isFunction, toLnglat, toPixel } from './';
import { Keys } from '../types/global';

type childFun = (extData: any) => React.ReactNode;

export const MarkerAllProps: Keys<AMap.Marker.Options>[] = [
  'position',
  'anchor',
  'offset',
  'icon',
  'content',
  'draggable',
  'visible',
  'zIndex',
  'angle',
  'animation',
  'shadow',
  'title',
  'clickable',
  'extData',
  'label',

  'topWhenClick',
  'bubble',
  'raiseOnDrag',
  'cursor',
  'autoRotation',
  'shape'
];

/**
 * 获取标记点参数的值
 * 主要为了position、offset支持更多的数据结构
 * @param key
 * @param value
 */
export const getPropValue = (
  key: Keys<AMap.Marker.Options>,
  value: any
) => {
  if (MarkerAllProps.indexOf(key) === -1) {
    return null;
  }
  // 特殊处理 position、offset
  if (key === 'position') {
    return toLnglat(value);
  } else if (key === 'offset') {
    return toPixel(value);
  }
  return value;
};

/**
 *
 * @param component
 * @param marker
 */
export const renderMarkerComponent = (
  component: React.ReactNode | childFun,
  marker: AMap.Marker
) => {
  let child: React.ReactNode = component;
  if (isFunction(component)) {
    const extData = marker.getExtData();
    child = component(extData);
  }
  child && ReactDOM.render(<div>{child}</div>, marker.getContent() as HTMLElement);
};
