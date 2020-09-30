import React, { useImperativeHandle } from 'react';
import useCircle from './use-circle';

export interface CircleProps extends
  AMap.MapChildProps,
  AMap.Circle.Options {
    visiable?: boolean;
    location?: AMap.PositionType;
  }

type CircleType = React.ForwardRefRenderFunction<{ circle?: AMap.Circle}, CircleProps>;

export const Circle: CircleType = (props, ref) => {
  const { circle } = useCircle(props);

  useImperativeHandle(ref, () => ({ ...props, circle }));

  return null;
};

export default React.forwardRef(Circle);
