import { CSSProperties } from 'react';

export interface Options {
  /**
   * 单个水印区域宽度
   */
  width?: number;
  /**
   * 单个水印区域高度
   */
  height?: number;
  /**
   * 透明度，取值: 0~1
   */
  opacity?: number;
  /**
   * 旋转的角度，取值: -360~360
   */
  rotate?: number;
  /**
   * 设置字体大小
   */
  fontSize?: number;
  /**
   * 设置字体粗细
   */
  fontWeight?: CSSProperties['fontWeight'];
  /**
   * 设置字体颜色
   */
  fontColor?: string;
  /**
   * 规定字体系列
   */
  fontFamily?: string;
}

export interface WatermarkDOM {
  watermarkId: string;
  watermarkWrapperId: string;
}

export interface Observers {
  DOMRemoveObserver?: MutationObserver;
  DOMAttrModifiedObserver?: MutationObserver;
}
