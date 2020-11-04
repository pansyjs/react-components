/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import useMapType from './use-map-type';

export interface MapTypeProps
  extends AMap.MapChildProps, AMap.MapType.Options {
    visible?: boolean;
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
