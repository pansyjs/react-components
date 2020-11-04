/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import useMouseTool from './use-mouse-tool';

export interface MouseToolProps
  extends AMap.MapChildProps, AMap.MouseToolEventMap {
    onCreated?: (mouseTool: AMap.MouseTool) => void;
  };

type MouseToolType = React.ForwardRefRenderFunction<AMap.MouseTool, MouseToolProps>;

const MouseTool: MouseToolType = (props, ref) => {
  const { mouseTool } = useMouseTool(props);

  useImperativeHandle(
    ref,
    () => mouseTool as AMap.MouseTool,
    [mouseTool]
  );

  return null;
};

export default React.forwardRef(MouseTool);
