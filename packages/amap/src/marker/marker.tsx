/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import useMarker from './use-marker';

export type MarkerOptions = AMap.Marker.Options;

export interface MarkerProps extends
  AMap.MapChildProps,
  Omit<MarkerOptions, 'position'>,
  Partial<AMap.MarkerEventMap> {
    position?: AMap.PositionType;
    visible?: boolean;
  }

type MarkerType = React.ForwardRefRenderFunction<AMap.Marker, MarkerProps>;

const Marker: MarkerType = (props, ref) => {
  const { marker } = useMarker(props);
  useImperativeHandle(ref, () => (marker as AMap.Marker));
  return null;
};

export default React.forwardRef(Marker);

