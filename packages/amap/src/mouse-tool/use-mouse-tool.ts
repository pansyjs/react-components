import { useState, useEffect } from 'react';
import { MouseToolProps } from './mouse-tool';
import { useEventProperties } from '../hooks';
import { Keys, MouseToolEventMap } from '../types/global';

export interface UseMouseTool extends MouseToolProps {}

const eventNames: Keys<MouseToolEventMap>[] = [
  'onDraw'
]

const useMouseTool = (props = {} as UseMouseTool) => {
  const { map, AMap, onCreated } = props;
  const [mouseTool, setMouseTool] = useState<AMap.MouseTool>();

  useEffect(() => {
    if (!mouseTool && AMap && map) {
      let instance: AMap.MouseTool;
      map.plugin(['AMap.MouseTool'], () => {
        instance = new AMap.MouseTool(map);
        setMouseTool(instance);
        onCreated?.(instance);
      })
    }
  }, [map]);

  // @ts-ignore
  useEventProperties<AMap.MouseTool, UseMouseTool>(mouseTool!, props, eventNames);

  return {
    mouseTool,
    setMouseTool
  }
}

export default useMouseTool;
