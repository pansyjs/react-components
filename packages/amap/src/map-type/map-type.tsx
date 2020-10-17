import React, { useImperativeHandle } from 'react';
import { MapChildProps } from '../types/global';
import useMapType from './use-map-type';

export interface MapTypeProps
  extends MapChildProps, AMap.MapType.Options {
    visiable?: boolean;
  }

type MapTypeType = React.ForwardRefRenderFunction<AMap.MapType, MapTypeProps>;

const MapType: MapTypeType = (props, ref) => {
  const { mapType } = useMapType(props);

  useImperativeHandle(
    ref,
    () => (mapType as AMap.MapType),
    [mapType]
  );

  return null;
};

export default React.forwardRef(MapType);
