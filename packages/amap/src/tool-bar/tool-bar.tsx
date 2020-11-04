/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import useToolBar from './use-tool-bar';

export type ToolBarOptions = AMap.ToolBar.Options;

export interface ToolBarProps
  extends AMap.MapChildProps, Omit<ToolBarOptions, 'offset'> {
    visible?: boolean;
    offset?: AMap.OffsetType;
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
