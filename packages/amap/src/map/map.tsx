/// <reference types="amap-js-api" />

import React, { useEffect, useRef, useImperativeHandle } from 'react';
import useMap from './use-map';

export interface MapProps extends Partial<AMap.Map.Options>, Partial<AMap.Map.EventMap> {
  className?: string;
  style?: React.CSSProperties;
  loading?: React.ReactNode;
}

const InternalMap: React.ForwardRefRenderFunction<{ map: AMap.Map }, MapProps> = (props, ref) => {
  const { className, style, children, loading, ...rest } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const { map, setContainer } = useMap({
    container: rootRef.current as HTMLDivElement,
    ...rest
  });
  useImperativeHandle(ref, () => ({ ...props, map, AMap, container: rootRef.current }), [map]);

  useEffect(
    () => {
      if (rootRef.current) {
        setContainer(rootRef.current)
      }
    },
    [rootRef.current]
  );

  const childs = React.Children.toArray(children);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{ fontSize: 1, height: '100%', ...style}}
    >
      {(map && typeof children === 'function')&& children({ map })}
      {map && childs.map((child) => {
        if (!React.isValidElement(child)) return;
        return React.cloneElement(child, {
          ...child.props,
          map
        });
      })}
    </div>
  )
}

export default React.forwardRef(InternalMap);
