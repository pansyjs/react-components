import { useEffect, useState } from 'react';
import { ControlBarProps } from './control-bar';
import { useVisiable } from '../hooks';

export interface UseControlBarControl extends ControlBarProps {}

function useControlBar(props = {} as UseControlBarControl) {
  const [controlBar, setControlBar] = useState<AMap.ControlBar>();
  const { map, position, visiable } = props;

  useEffect(() => {
    console.log(map);
    console.log(controlBar);
    if (map && !controlBar) {
      let instance: AMap.ControlBar;
      map.plugin(['AMap.ControlBar', 'AMap.HawkEye'], () => {
        instance = new AMap.ControlBar({
          // @ts-ignore
          offset: props['offset'],
          position
        });
        map.addControl(instance);
        setControlBar(instance);
      });

      return () => {
        if (instance) {
          map.removeControl(instance);
        }
      }
    }

    return () => {};
  }, [map]);

  useVisiable(controlBar!, visiable);

  return {
    controlBar, setControlBar
  };
}

export default useControlBar
