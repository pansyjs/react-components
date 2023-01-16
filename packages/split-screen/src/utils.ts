import type { CSSProperties } from 'react';

interface Config {
  rows: number;
  different: number;
  differentRows: number;
}

const weirdSplitScreenConfig: Record<number, Config> = {
  6: {
    rows: 3,
    different: 1,
    differentRows: 2,
  },
  8: {
    rows: 4,
    different: 1,
    differentRows: 3,
  }
}

/**
 * 获取窗口的样式
 * @param amount 分屏数
 * @param amount 分屏的间隔
 * @param index 分屏的索引
 * @returns
 */
export const getVideoWindowStyle = (
  amount: number,
  index: number
) => {
  let style: CSSProperties = {};

  const sqrt = Math.sqrt(amount);

  // n*n >> 1、4、6、8
  if (Number.isInteger(sqrt)) {
    style = {
      width: `calc(100% / ${sqrt})`,
      height: `calc(100% / ${sqrt})`,
    }
    return style;
  }

  // 6、8
  const config = weirdSplitScreenConfig[amount];

  if (config) {
    style = {
      float: 'left',
      width: `${100 /config.rows}%`,
      height: `${100 /config.rows}%`,
    }

    if (index + 1 === config.different) {
      style.width = `calc(${(100 / config.rows) * config.differentRows}%)`;
      style.height = `calc(${(100 / config.rows) * config.differentRows}% - 1px)`;
    }

    return style;
  };

  // 13
  const splitScreenConfig = {
    rows: 4,
    different: 6,
    differentRows: 2
  }

  style = {
    position: 'absolute',
    width: `25%`,
    height: `25%`
  }

  if (index + 1 === splitScreenConfig.different) {
    style.width = `calc(${(100 / splitScreenConfig.rows) * splitScreenConfig.differentRows}%)`;
    style.height = `calc(${(100 / splitScreenConfig.rows) * splitScreenConfig.differentRows}%)`;
  }

  if (index >= 0 && index <= 3) {
    style.top = 0;
    style.left = `${index * 25}%`;
  }

  if (index === 4) {
    style.top = '25%';
    style.left = 0;
  }

  if (splitScreenConfig.different === index + 1) {
    style.top = '25%';
    style.left = '25%';
  }

  if (index === 6) {
    style.top = '25%';
    style.left = '75%';
  }

  if (index === 7) {
    style.top = `calc(50%)`;
    style.left = 0;
  }

  if (index === 8) {
    style.top = `calc(50%)`;
    style.left = '75%';
  }

  if (index >= 9 && index <= 12) {
    style.top = `calc(75%)`;
    style.left = `${(index - 9) * 25}%`;
  }

  return style;
}
