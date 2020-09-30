import React, { useImperativeHandle } from 'react';
import useMarker from './use-marker';
import { MapChildProps, MarkerEventMap, PositionType } from '../types/global';

export interface MarkerProps extends
  MapChildProps,
  AMap.Marker.Options,
  MarkerEventMap {
    location?: PositionType;
    visiable?: boolean;
  }

type MarkerType = React.ForwardRefRenderFunction<{ marker?: AMap.Marker}, MarkerProps>;

const Marker: MarkerType = (props, ref) => {
  const { marker } = useMarker(props);
  useImperativeHandle(ref, () => ({ marker }));
  return null;
};

export default React.forwardRef(Marker);

