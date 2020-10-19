/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import useScale from './use-scale';

export type ScaleOptions = AMap.Scale.Options;

export interface ScaleProps extends
  AMap.MapChildProps,
  Omit<ScaleOptions, 'offset'> {
    visible?: boolean;
    offset?: AMap.OffsetType;
  }

type ScaleType = React.ForwardRefRenderFunction<AMap.Scale, ScaleProps>;

const Scale: ScaleType = (props, ref) => {
  const { scale } = useScale(props);

  useImperativeHandle(
    ref,
    () => (scale as AMap.Scale),
    [scale]
  );

  return null;
};

export default React.forwardRef(Scale);
