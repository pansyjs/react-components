import { useEffect, useState } from 'react';
import { MapProps } from './';

interface UseMap extends MapProps {
  /**
   * 指定的容器
   */
  container?: HTMLDivElement;
}

interface UseMapResult {
  map: AMap.Map,
  setContainer: any
}

const useMap = (props: UseMap = {}): UseMapResult => {
  const [mapInstance, setMapInstance] = useState<AMap.Map>();
  const [zoom, setZoom] = useState(props.zoom || 15);
  const [container, setContainer] = useState<HTMLDivElement>(props.container as HTMLDivElement);

  useEffect(
    () => {
      if (container && !mapInstance && window.AMap) {
        setMapInstance(new AMap.Map(container, { zoom, ...props }));
      }

      return () => {
        if (mapInstance) {
          mapInstance.destroy();
        }
      }
    },
    [container]
  );

  useEffect(() => {
    if (
      mapInstance &&
      typeof props.zoom === 'number' &&
      zoom !== props.zoom &&
      props.zoom >= 2 && props.zoom <= 20
    ) {
      setZoom(props.zoom);
      mapInstance.setZoom(props.zoom);
    }
  }, [zoom, props.zoom]);

  return {
    map: mapInstance as AMap.Map,
    setContainer,
  }
}

export default useMap;
