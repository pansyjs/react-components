/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import usePolygon from './use-polygon';

export interface PolygonProps extends
  AMap.MapChildProps,
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
