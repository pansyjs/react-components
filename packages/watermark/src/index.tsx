import React, { useLayoutEffect, useRef } from 'react';
import { getStyleStr, genRandomId, getDrawPatternByCanvas } from './utils';
import SecurityDefense from './security-defense';
import { Options, Observers } from './interface';

export interface WatermarkProps {
  /**
   * 额外的样式
   */
  style?: React.CSSProperties;
  /**
   * 是否开启监视模式
   */
  monitor?: boolean;
  /**
   * 指定渲染引擎
   */
  renderer?: 'canvas' | 'svg'
  /**
   * 水印文本
   */
  text?: string | string[];
  /**
   * 水印配置
   */
  options?: Options;
  /**
   * 样式层级
   */
  zIndex?: number;
  /**
   *
   */
  securityAlarm?: () => void;
}

const defaultOptions: Options = {
  width: 160,
  height: 80,
  opacity: 0.2,
  rotate: 20,
  fontColor: '#727071',
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontSize: 14,
}

const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.7,
  pointerEvents: 'none',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  backgroundRepeat: 'repeat'
};

const noop = function () {};

const Watermark: React.FC<WatermarkProps> = ({
  style,
  text,
  monitor,
  options,
  zIndex,
  securityAlarm,
  children
}) => {
  const watermarkId = genRandomId('watermark');
  const watermarkWrapperId = genRandomId('watermark-wrapper');
  defaultStyle.zIndex = zIndex;
  const waterMarkStyle = getStyleStr(defaultStyle);


  const security = useRef<SecurityDefense>(null);
  const DOMRemoveObserver = useRef<any>();
  const DOMAttrModifiedObserver = useRef<any>();

  useLayoutEffect(() => {
    if (monitor) {
      disconnect();
      security.current = new SecurityDefense(
        {
          watermarkId: watermarkId,
          watermarkWrapperId: watermarkWrapperId
        },
        {
          waterMarkStyle,
          getCanvasUrl: getCanvasUrl
        },
        {
          securityAlarm,
          updateObserver: updateObserver
        }
      );
    } else {
      disconnect();
    }
    return () => {
      disconnect();
    }
  }, [JSON.stringify(text), monitor]);

  const disconnect = () => {
    DOMRemoveObserver.current && DOMRemoveObserver.current.disconnect();
    DOMAttrModifiedObserver.current && DOMAttrModifiedObserver.current.disconnect();
    security.current = null;
  }

  const getCanvasUrl = () => {
    const newOptions = Object.assign({}, defaultOptions, options)
    return getDrawPatternByCanvas(text, newOptions)
  }

  const updateObserver = (observers: Observers = {}) => {
    if (observers.DOMRemoveObserver) {
      DOMRemoveObserver.current = observers.DOMRemoveObserver
    }
    if (observers.DOMAttrModifiedObserver) {
      DOMAttrModifiedObserver.current = observers.DOMAttrModifiedObserver
    }
  }

  const watermarkStyles: React.CSSProperties = {
    ...defaultStyle,
    backgroundImage: `url("${getCanvasUrl()}")`
  }

  return (
    <div style={{ ...style, position: 'relative', overflow: 'hidden' }} id={watermarkWrapperId}>
      <div style={watermarkStyles} id={watermarkId} />
      {children}
    </div>
  )
}

Watermark.defaultProps = {
  monitor: true,
  renderer: 'canvas',
  options: defaultOptions,
  securityAlarm: noop,
  zIndex: 9999
}

export default Watermark;
