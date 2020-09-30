import React from 'react';
import ReactDOM from 'react-dom';
import { isFunction, toLnglat, toPixel } from './';
import { Keys } from '../types/global';


type childFun = (extData: any) => React.ReactNode;

export const MarkerConfigurableProps: Keys<AMap.Marker.Options>[] = [
  'position',
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
  'label'
];

export const MarkerAllProps = MarkerConfigurableProps.concat([
  'topWhenClick',
  'bubble',
  'raiseOnDrag',
  'cursor',
  'autoRotation',
  'shape'
]);

export const getPropValue = (key: Keys<AMap.Marker.Options>, value: any) => {
  if (MarkerAllProps.indexOf(key) === -1) {
    return null;
  }
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
