/// <reference types="../types/circle-marker" />

import React, { useImperativeHandle } from 'react';
import useCircleMarker from './use-circle-marker';

export interface CircleMarkerProps extends
  AMap.MapChildProps,
  Partial<AMap.InfoWindowEventMap>,
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
