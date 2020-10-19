/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import useCircle from './use-circle';

export type CircleOptions = AMap.Circle.Options;

export interface CircleProps extends
  AMap.MapChildProps,
  CircleOptions {
    visible?: boolean;
    location?: AMap.PositionType;
  }

type CircleType = React.ForwardRefRenderFunction<{ circle?: AMap.Circle}, CircleProps>;

export const Circle: CircleType = (props, ref) => {
  const { circle } = useCircle(props);

  useImperativeHandle(ref, () => ({ ...props, circle }));

  return null;
};

export default React.forwardRef(Circle);
