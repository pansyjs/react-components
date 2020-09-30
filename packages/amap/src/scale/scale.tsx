import React, { useImperativeHandle } from 'react';
import { MapChildProps } from '../types/global';
import useScale from './use-scale';

export interface ScaleProps extends
  MapChildProps,
  AMap.Scale.Options {
    visiable?: boolean;
  }

type ScaleType = React.ForwardRefRenderFunction<{ scale?: AMap.Scale }, ScaleProps>;

const Scale: ScaleType = (props, ref) => {
  const { scale } = useScale(props);
  useImperativeHandle(ref, () => ({ scale }), [scale]);
  return null;
};

export default React.forwardRef(Scale);
