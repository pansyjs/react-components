import React, { useImperativeHandle } from 'react';
import useCircleMarker from './use-circle-marker';
import { MapChildProps } from '../types/global';

export interface CircleMarkerProps extends
  MapChildProps,
  AMap.CircleMarker.Options {
    visible?: boolean;
  }

type CircleMarkerType = React.ForwardRefRenderFunction<{ circleMarker?: AMap.CircleMarker}, CircleMarkerProps>;

export const CircleMarker: CircleMarkerType = (props, ref) => {
  const { circleMarker } = useCircleMarker(props);
  useImperativeHandle(ref, () => ({ ...props, circleMarker }));
  return null;
};

export default React.forwardRef(CircleMarker);
