/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import usePolygon from './use-polygon';

export type PolygonOptions = AMap.Polygon.Options;

export interface PolygonProps extends
  AMap.MapChildProps,
  Partial<AMap.PolygonEventMap>,
  PolygonOptions {
    visible?: boolean;
  }

type PolygonType = React.ForwardRefRenderFunction<AMap.Polygon, PolygonProps>;

const Polygon: PolygonType = (props, ref) => {
  const { polygon } = usePolygon(props);
  useImperativeHandle(ref, () => (polygon as AMap.Polygon));
  return null;
};

export default React.forwardRef(Polygon);
