import React, { useImperativeHandle } from 'react';
import useMarker from './use-marker';
import {}  from '../';

export interface MarkerProps extends
  AMap.MapChildProps,
  AMap.Marker.Options,
  AMap.MarkerEventMap {
    location?: AMap.PositionType;
    visiable?: boolean;
  }

type MarkerType = React.ForwardRefRenderFunction<{ marker?: AMap.Marker}, MarkerProps>;

const Marker: MarkerType = (props, ref) => {
  const { marker } = useMarker(props);
  useImperativeHandle(ref, () => ({ marker }));
  return null;
};

export default React.forwardRef(Marker);

