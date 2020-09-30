import React, { useEffect, useRef, useImperativeHandle } from 'react';
import useMap from './use-map';
import APILoader from '../api-loader';
import { Options } from '../api-loader/use-api-loader';

export type MapOptions = AMap.Map.Options;

export interface InternalMapProps extends
  Partial<MapOptions>,
  Partial<AMap.MapEventMap> {
    className?: string;
    style?: React.CSSProperties;
    center?: AMap.LocationValue;
  }

export interface MapProps extends InternalMapProps {
  options?: Options;
  loading?: React.ReactNode;
}

const InternalMap: React.ForwardRefRenderFunction<{ map: AMap.Map }, InternalMapProps> = (props, ref) => {
  const { className, style, children, ...rest } = props;
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

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (child && React.isValidElement(child)) {
        const type = child.type;
        /*
         * 针对下面两种组件不注入地图相关属性
         * 1. 明确声明不需要注入的
         * 2. DOM 元素
         */
        if (type['preventAmap'] || (typeof type === 'string')) {
          return child
        }
        return React.cloneElement(child, {
          ...child.props,
          AMap,
          map
        });
      }
      return child
    })
  }

  return (
    <>
      <div
        ref={rootRef}
        className={className}
        style={{ fontSize: 1, height: '100%', ...style}}
      />
      {map && (
        <>
         {typeof children === 'function' && children({ map, AMap })}
         {renderChildren()}
        </>
      )}
    </>
  )
}

const ForwardRefInternalMap = React.forwardRef(InternalMap);

const Map: React.FC<MapProps> = (props) => {
  const { options = {}, loading, ...rest } = props;

  return (
    <APILoader {...options} loading={loading}>
      <ForwardRefInternalMap {...rest} />
    </APILoader>
  )
}

export default Map;
