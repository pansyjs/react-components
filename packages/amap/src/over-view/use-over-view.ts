import { useEffect, useState } from 'react';
import { OverViewProps } from './over-view';
import { useVisiable } from '../hooks';
import { toPixel } from '../utils';

export interface UseOverView extends OverViewProps {}

function useOverView(props = {} as UseOverView) {
  const [overView, setOverView] = useState<AMap.OverView>();
  const { map, AMap, visiable, ...rest } = props;

  useEffect(() => {
    if (map && !overView) {
      let instance: AMap.OverView;
      map.plugin(['AMap.OverView'], () => {
        const pixel = getOffset();
        instance = new AMap.OverView({
          ...rest,
          offset: pixel
        });
        map.addControl(instance);
        setOverView(instance);
      });

      return () => {
        if (instance) {
          map.removeControl(instance);
        }
      }
    }

    return () => {};
  }, [map]);

  useVisiable(overView!, visiable);

  const getOffset = () => {
    return (overView && props?.offset) && toPixel(props?.offset as AMap.Pixel);
  }

  return {
    overView, setOverView
  };
}

export default useOverView;
