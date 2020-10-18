import React, { useImperativeHandle } from 'react';
import usePolygon from './use-polygon';
import { MapChildProps } from '../types/global';

export interface PolygonProps extends
  MapChildProps,
  AMap.Polygon.Options {
    visible?: boolean;
  }

type PolygonType = React.ForwardRefRenderFunction<{ polygon?: AMap.Polygon}, PolygonProps>;

const Polygon: PolygonType = (props, ref) => {
  const { polygon } = usePolygon(props);
  useImperativeHandle(ref, () => ({ polygon }));
  return null;
};

export default React.forwardRef(Polygon);
