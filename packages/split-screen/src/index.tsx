import React, { useState, useEffect } from 'react';
import { getVideoWindowStyle } from './utils';
import type { SplitScreenAmount } from './types';

export interface SplitScreenProps<D = any[]> {
  /** 额外的样式类 */
  className?: string;
  /** 额外的样式 */
  style?: React.CSSProperties;
  /** 当前的分屏数量 */
  amount: SplitScreenAmount;
  /** 需要用到的数据池 */
  list?: D[];
  /** 分屏的间隔 */
  gutter?: number;
  /** 分屏的背景色 */
  background?: string;
  /** 业务相关 */
  children: (index: number, data: D) => React.ReactNode;
}

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
}

export function SplitScreen<D = any[]>({
  className,
  style,
  amount = 4,
  list = [],
  gutter = 8,
  background = "#000",
  children,
}: SplitScreenProps<D>) {
  const [items, setItems] = useState<any[]>(new Array(amount).fill(undefined));

  useEffect(
    () => {
      if (amount) {
        setItems(new Array(amount).fill(undefined));
      }
    },
    [amount]
  )

  const renderChildren = (index: number) => {
    if (typeof children === 'function') {
      return children(index, list[index]);
    }

    return null
  }

  const contentStyle: React.CSSProperties = {
    position: 'absolute',
    width: `calc(100% + ${gutter}px)`,
    height: `calc(100% + ${gutter}px)`,
    margin: `-${gutter / 2}px -${gutter / 2}px`,
  }

  const itemStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    padding: `${gutter / 2}px`,
    overflow: 'hidden',
    verticalAlign: 'top'
  }

  const itemContentStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background
  }

  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <div style={contentStyle}>
        {items.map((_, index) => {
          const style = getVideoWindowStyle(amount, index);
          return (
            <div key={index} style={{ ...itemStyle, ...style }}>
              <div style={itemContentStyle}>
                {renderChildren(index)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SplitScreen;
