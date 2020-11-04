/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import useCircleMarker from './use-circle-marker';

export type CircleMarkerOptions = AMap.CircleMarker.Options;

export interface CircleMarkerProps extends
  AMap.MapChildProps,
  CircleMarkerOptions {
    visible?: boolean;
  }

type CircleMarkerType = React.ForwardRefRenderFunction<{ circleMarker?: AMap.CircleMarker}, CircleMarkerProps>;

export const CircleMarker: CircleMarkerType = (props, ref) => {
  const { circleMarker } = useCircleMarker(props);
  useImperativeHandle(ref, () => ({ ...props, circleMarker }));
  return null;
};

export default React.forwardRef(CircleMarker);
