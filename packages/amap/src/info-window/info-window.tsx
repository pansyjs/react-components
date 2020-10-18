import React, { useImperativeHandle } from 'react';
import useInfoWindow from './use-info-window';
import { MapChildProps, InfoWindowEventMap, PositionType } from '../types/global';

export interface InfoWindowProps extends
  MapChildProps,
  Partial<InfoWindowEventMap>,
  AMap.InfoWindow.Options {
    location?: PositionType;
    visible?: boolean;
  }

type InfoWindowType = React.ForwardRefRenderFunction<{ infoWindow?: AMap.InfoWindow}, InfoWindowProps>;

const InfoWindow:InfoWindowType = ((props, ref) => {
  const { infoWindow } = useInfoWindow(props);
  useImperativeHandle(ref, () => ({ ...props, infoWindow }));

  return null;
});

export default React.forwardRef(InfoWindow);
