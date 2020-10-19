/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import useInfoWindow from './use-info-window';

export interface InfoWindowProps extends
  AMap.MapChildProps,
  Partial<AMap.InfoWindowEventMap>,
  AMap.InfoWindow.Options {
    location?: AMap.PositionType;
    visible?: boolean;
  }

type InfoWindowType = React.ForwardRefRenderFunction<{ infoWindow?: AMap.InfoWindow}, InfoWindowProps>;

const InfoWindow:InfoWindowType = ((props, ref) => {
  const { infoWindow } = useInfoWindow(props);
  useImperativeHandle(ref, () => ({ ...props, infoWindow }));

  return null;
});

export default React.forwardRef(InfoWindow);
