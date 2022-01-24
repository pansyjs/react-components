import React, { useRef, useState, useEffect } from 'react';
import { useSize } from '@pansy/use-size';
import { getAdaptiveConfig, getGutter } from './utils';

import type { AdaptiveConfig } from './utils';

export interface ResponsiveCardProps {
  /** 额外的样式类 */
  className?: string;
  /** 额外的样式 */
  style?: React.CSSProperties;
  /**
   * 卡片的默认宽度
   * @default 260
   */
  defaultWidth?: number;
  /**
   * 间距设置
   * @default 16
   */
  gutter?: [number, number];
  children?: ((config: AdaptiveConfig) => React.ReactNode) | React.ReactNode;
}

const rootStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}

const defaultGutter = 16;

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  className,
  style,
  defaultWidth = 260,
  gutter = defaultGutter,
  children,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [adaptiveConfig, setAdaptiveConfig] = useState<AdaptiveConfig>({} as AdaptiveConfig);

  /** 水平间隔 */
  const horizontalGutter = getGutter(gutter, 0) ?? defaultGutter;
  /** 垂直间隔 */
  const verticalGutter = getGutter(gutter, 1) ?? defaultGutter;
  const { width } = useSize(rootRef) ?? {};

  useEffect(
    () => {
      setAdaptiveConfig(getAdaptiveConfig(width, {
        defaultWidth,
        defaultGutter: horizontalGutter
      }));
    },
    [width, horizontalGutter, verticalGutter, defaultGutter]
  );

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(adaptiveConfig);
    }

    return React.Children.map(children, (child: any, index: number) => {
      const style = {
        width: adaptiveConfig.width,
        marginRight:
          (index + 1) % adaptiveConfig.span != 0
            ? adaptiveConfig.gutter
            : 0,
      }

      return React.cloneElement(child, {
        style
      })
    });
  }

  return (
    <div
      className={className}
      style={{
        ...rootStyle,
        rowGap: verticalGutter,
        ...style
      }}
      ref={rootRef}
    >
      {renderChildren()}
    </div>
  )
}
