import React, { useImperativeHandle } from 'react';
import { MapChildProps } from '../types/global';
import useControlBar from './use-control-bar';

export interface ControlBarProps extends
  MapChildProps,
  AMap.ControlBar.Options {
    visiable?: boolean;
  }

type ControlBarType = React.ForwardRefRenderFunction<{ controlBar?: AMap.ControlBar }, ControlBarProps>;

export const ControlBar: ControlBarType = (props, ref) => {
  const { controlBar } = useControlBar(props);
  useImperativeHandle(ref, () => ({ controlBar }), [controlBar]);
  return null;
};

export default React.forwardRef(ControlBar);
