import React, { useImperativeHandle } from 'react';
import { MapChildProps, OffsetType } from '../types/global';
import useToolBar from './use-tool-bar';

export type ToolBarOptions = AMap.ToolBar.Options;

export interface ToolBarProps
  extends MapChildProps, Omit<ToolBarOptions, 'offset'> {
    visiable?: boolean;
    offset?: OffsetType;
  }

type ToolBarType = React.ForwardRefRenderFunction<AMap.ToolBar, ToolBarProps>;

const ToolBar: ToolBarType = (props, ref) => {
  const { toolBar } = useToolBar(props);

  useImperativeHandle(
    ref,
    () => (toolBar as AMap.ToolBar),
    [toolBar]
  );

  return null;
};

export default React.forwardRef(ToolBar);
