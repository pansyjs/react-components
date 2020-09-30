/// <reference types="../types/circle-marker" />

import React, { useImperativeHandle } from 'react';
import useCircleMarker from './use-circle-marker';
import { MapChildProps, InfoWindowEventMap } from '../types/global';

export interface CircleMarkerProps extends
  MapChildProps,
  Partial<InfoWindowEventMap>,
  AMap.CircleMarker.Options {
    visiable?: boolean;
  }

type CircleMarkerType = React.ForwardRefRenderFunction<{ circleMarker?: AMap.CircleMarker}, CircleMarkerProps>;

export const CircleMarker: CircleMarkerType = (props, ref) => {
  const { circleMarker } = useCircleMarker(props);
  useImperativeHandle(ref, () => ({ ...props, circleMarker }));
  return null;
};

export default React.forwardRef(CircleMarker);
