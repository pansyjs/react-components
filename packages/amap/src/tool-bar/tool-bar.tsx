import React, { useImperativeHandle } from 'react';
import { MapChildProps } from '../types/global';
import useToolBar from './use-tool-bar';

export interface ToolBarProps extends MapChildProps, AMap.ToolBar.Options {
  visiable?: boolean;
}

type ToolBarType = React.ForwardRefRenderFunction<{ toolBar?: AMap.ToolBar }, ToolBarProps>;

const ToolBar: ToolBarType = (props, ref) => {
  const { toolBar } = useToolBar(props);
  useImperativeHandle(ref, () => ({ toolBar }), [toolBar]);
  return null;
};

export default React.forwardRef(ToolBar);
