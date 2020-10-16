import { useEffect, useState } from 'react';
import { ToolBarProps } from './tool-bar';
import { useVisiable } from '../hooks';

export interface UseToolBar extends ToolBarProps {}

function useToolBar(props = {} as UseToolBar) {
  const [toolBar, setToolBar] = useState<AMap.ToolBar>();
  const { map, position, visiable, offset } = props;

  useEffect(() => {
    if (map && !toolBar) {
      let instance: AMap.ToolBar;
      map.plugin(['AMap.ToolBar'], () => {
        instance = new AMap.ToolBar({
          offset,
          position
        });
        console.log(instance);
        map.addControl(instance);
        setToolBar(instance);
      });

      return () => {
        if (instance) {
          map.removeControl(instance);
        }
      }
    }

    return () => {};
  }, [map]);

  useVisiable(toolBar!, visiable);

  return {
    toolBar, setToolBar
  };
}


export default useToolBar
