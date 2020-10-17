import { useEffect, useState } from 'react';
import { ToolBarProps } from './tool-bar';
import { useVisiable } from '../hooks';
import { toPixel } from '../utils';

export interface UseToolBar extends ToolBarProps {}

function useToolBar(props = {} as UseToolBar) {
  const [toolBar, setToolBar] = useState<AMap.ToolBar>();
  const { map, AMap, visiable, ...rest } = props;

  useEffect(() => {
    if (map && !toolBar) {
      let instance: AMap.ToolBar;

      if (AMap?.ToolBar) {
        instance = createToolBar();
      } else {
        map.plugin(['AMap.ToolBar'], () => {
          instance = createToolBar();
        });
      }

      return () => {
        instance && map.removeControl(instance);
      }
    }

    return () => {};
  }, [map]);

  useVisiable(toolBar!, visiable);

  const createToolBar = () => {
    console.log(rest);
    const pixel = getOffset();
    const instance = new AMap.ToolBar({
      ...rest,
      offset: pixel
    });

    map?.addControl(instance);
    setToolBar(instance);

    return instance;
  }

  const getOffset = () => {
    return (toolBar && props?.offset) && toPixel(props?.offset as AMap.Pixel);
  }

  return {
    toolBar, setToolBar
  };
}


export default useToolBar
