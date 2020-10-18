import React, { useImperativeHandle } from 'react';
import useMarker from './use-marker';
import { MapChildProps, MarkerEventMap, PositionType } from '../types/global';

export interface MarkerProps extends
  MapChildProps,
  AMap.Marker.Options,
  MarkerEventMap {
    location?: PositionType;
    visible?: boolean;
  }

type MarkerType = React.ForwardRefRenderFunction<AMap.Marker, MarkerProps>;

const Marker: MarkerType = (props, ref) => {
  const { marker } = useMarker(props);
  useImperativeHandle(ref, () => (marker as AMap.Marker));
  return null;
};

export default React.forwardRef(Marker);

