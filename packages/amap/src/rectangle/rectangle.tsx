import React, { useImperativeHandle } from 'react';
import useRectangle from './use-rectangle';
import { MapChildProps } from '../types/global';

export interface RectangleProps extends
  MapChildProps,
  AMap.Rectangle.Options {
    visible?: boolean;
  }

type RectangleType = React.ForwardRefRenderFunction<{ rectangle?: AMap.Rectangle}, RectangleProps>;

const Rectangle: RectangleType = (props, ref) => {
  const { rectangle } = useRectangle(props);
  useImperativeHandle(ref, () => ({ ...props, rectangle }));
  return null;
};

export default React.forwardRef(Rectangle);
