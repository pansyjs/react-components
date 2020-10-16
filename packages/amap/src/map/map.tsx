import React, { useEffect, useRef, useImperativeHandle } from 'react';
import useMap from './use-map';
import { LoadOption } from '../utils/api-loader';
import { MapEventMap, PositionType } from '../types/global';

export type MapOptions = AMap.Map.Options;
export type RenderProps = (value: { AMap: typeof AMap, map: AMap.Map }) => Element | React.ReactNode;

export interface InternalMapProps extends
  Partial<Omit<MapOptions, 'center'>>,
  Partial<MapEventMap> {
    className?: string;
    style?: React.CSSProperties;
    center?: PositionType;
    children?: RenderProps | React.ReactNode;
  }

export interface MapProps extends InternalMapProps {
  options?: LoadOption;
  loading?: React.ReactNode;
}

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative'
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%'
}

const InternalMap: React.ForwardRefRenderFunction<AMap.Map, MapProps> = (props, ref) => {
  const { className, style, children, loading, ...rest } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const { map, AMap, loaded, setContainer } = useMap({
    container: rootRef.current as HTMLDivElement,
    ...rest
  });

  useImperativeHandle(
    ref,
    () => map,
    [map]
  );

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
    <div style={wrapperStyle}>
      <div
        ref={rootRef}
        className={className}
        style={containerStyle}
      >
        {
          loaded && (loading || null)
        }
      </div>
      {(map && AMap) && (
        <>
         {typeof children === 'function' && (children as RenderProps)({ map, AMap })}
         {renderChildren()}
        </>
      )}
    </div>
  )
}

export default React.forwardRef(InternalMap);
