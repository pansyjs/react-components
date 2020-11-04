import { useEffect, useState } from 'react';
import { ControlBarProps } from './control-bar';

export interface UseControlBarControl extends ControlBarProps {}

function useControlBar(props = {} as UseControlBarControl) {
  const [controlBar, setControlBar] = useState<AMap.ControlBar>();
  const { map, position, showControlButton, showZoomBar } = props;

  useEffect(() => {
    if (map && !controlBar) {
      let instance: AMap.ControlBar;
      map.plugin(['AMap.ControlBar'], () => {
        instance = new AMap.ControlBar({
          position,
          showZoomBar,
          showControlButton
        });
        map.addControl(instance);
        setControlBar(instance);
      });

      return () => {
        instance && map.removeControl(instance);
      }
    }

    return () => {};
  }, [map]);

  return {
    controlBar,
    setControlBar
  };
}

export default useControlBar
