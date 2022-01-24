import isNumber from 'lodash/isNumber';

export interface Opts {
  /** 默认宽度 */
  defaultWidth?: number;
  /** 默认间距 */
  defaultGutter?: number;
}

export interface AdaptiveConfig {
  /** 每项的宽度 */
  width: number;
  /** 左右间距 */
  gutter: number;
  /** 每行的数目 */
  span: number;
}

/**
 * 获取适配结果
 * @param width
 * @param opts
 */
export const getAdaptiveConfig = (
  width?: number,
  { defaultWidth = 260, defaultGutter = 16 }: Opts = {},
) => {
  const adaptiveConfig: AdaptiveConfig = {
    width: 0,
    gutter: 0,
    span: 0,
  };

  if (!isNumber(width) || width < defaultWidth) return adaptiveConfig;

  // 只能放置一个卡片
  if (width <= defaultWidth * 2) {
    adaptiveConfig.width = width;
    adaptiveConfig.gutter = 0;
    adaptiveConfig.span = 1;
  }

  const num = Math.floor(width / defaultWidth);
  const defaultGutterTotal = (num - 1) * defaultGutter;

  if (width > defaultGutterTotal + defaultWidth * num) {
    adaptiveConfig.width = (width - defaultGutterTotal) / num;
    adaptiveConfig.gutter = defaultGutter;
    adaptiveConfig.span = num;
  } else {
    adaptiveConfig.width = (width - (num - 2) * defaultGutter) / (num - 1);
    adaptiveConfig.gutter = defaultGutter;
    adaptiveConfig.span = num - 1;
  }

  return adaptiveConfig;
};

export function getGutter(value: number | number[], index: 0 | 1): number | undefined {
  if (Array.isArray(value)) {
    return value[index];
  }

  return value;
}
