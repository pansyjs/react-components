import React, { useImperativeHandle } from 'react';
import useMouseTool from './use-mouse-tool';
import { MapChildProps, MouseToolEventMap } from '../types/global';

export interface MouseToolProps
  extends MapChildProps, MouseToolEventMap {
    onCreated?: (mouseTool: AMap.MouseTool) => void;
  };

type MouseToolType = React.ForwardRefRenderFunction<AMap.MouseTool, MouseToolProps>;

const MouseTool: MouseToolType = (props, ref) => {
  const { mouseTool } = useMouseTool(props);

  console.log(mouseTool);

  useImperativeHandle(
    ref,
    () => mouseTool as AMap.MouseTool,
    [mouseTool]
  );

  return null;
};

export default React.forwardRef(MouseTool);
