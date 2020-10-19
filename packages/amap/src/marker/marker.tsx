import React, { useImperativeHandle } from 'react';
import useMarker from './use-marker';
import { MapChildProps, MarkerEventMap, PositionType } from '../types/global';

export type MarkerOptions = AMap.Marker.Options;

export interface MarkerProps extends
  MapChildProps,
  Omit<MarkerOptions, 'position'>,
  Partial<MarkerEventMap> {
    position?: PositionType;
    visible?: boolean;
  }

type MarkerType = React.ForwardRefRenderFunction<AMap.Marker, MarkerProps>;

const Marker: MarkerType = (props, ref) => {
  const { marker } = useMarker(props);
  useImperativeHandle(ref, () => (marker as AMap.Marker));
  return null;
};

export default React.forwardRef(Marker);

