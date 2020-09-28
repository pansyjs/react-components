import { CSSProperties } from 'react';
import { Options } from './interface';

const encrypt = (str: string): string => {
  return window.btoa(decodeURI(encodeURIComponent(str)))
}

export const genRandomId = (prefix = '') => {
  return `${encrypt(prefix)}-${(new Date()).getTime()}-${Math.floor(Math.random() * Math.pow(10, 8))}`
}

/**
 * 将样式对象转换为字符串
 * @param style
 */
export const getStyleStr = (style: CSSProperties = {}): string => {
  let str = '';

  Object.keys(style).forEach(item => {
    const key = item.replace(/([A-Z])/g, '-$1').toLowerCase();
    str += `${key}:${style[item]};`
  })

  return str;
}

export function getDevicePixelRatio(): number {
  return window.devicePixelRatio ? Math.round(window.devicePixelRatio) : 2
}

/**
 * 获取 MutationObserver 对象
 */
export function getMutationObserver() {
  return window.MutationObserver || window['WebKitMutationObserver'] || window['MozMutationObserver']
}

/**
 * 获取背景图片，通过Canvas
 * @param text
 * @param options
 */
export function getDrawPatternByCanvas(
  text: string | string[],
  {
    width,
    height,
    rotate,
    opacity,
    fontSize,
    fontWeight,
    fontFamily,
    fontColor
  }: Options
) {
  const dpr = getDevicePixelRatio();
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  // canvas.style.width = `${width}px`;
  // canvas.style.height = `${height}px`;

  // canvas.setAttribute('width', `${width * dpr}px`);
  // canvas.setAttribute('height', `${height * dpr}px`);

  const ctx = canvas.getContext('2d');

  // 绘制之前清除画布
  ctx.clearRect(0, 0, width, height);
  // 设置透明度
  ctx.globalAlpha = opacity;
  // 设置字体
  ctx.font = `normal ${fontWeight} ${fontSize}px '${fontFamily}'`;

  // ctx.scale(dpr, dpr);

  // 调试用代码
  // ctx.strokeRect(0, 0, width, height);

  // ctx.moveTo (0, height);
  // ctx.lineTo (width, 0);
  // ctx.strokeStyle = 'red';
  // ctx.stroke();


  // ctx.moveTo (0, 0);
  // ctx.lineTo (width, height);
  // ctx.strokeStyle = 'red';
  // ctx.stroke();

  ctx.textAlign = 'center';

  // 设置旋转角度
  ctx.translate(parseFloat(`${width}`) / 2, parseFloat(`${height}`) / 2);
  ctx.rotate(rotate * (Math.PI / 180));
  ctx.translate(-parseFloat(`${width}`) / 2, -parseFloat(`${height}`) / 2);

  // 设置字体颜色
  ctx.fillStyle = fontColor;

  // 获取文本的最大宽度以及文案
  let maxText = '';
  const textList = Array.isArray(text) ? text : [text];
  const widthList = textList.map(item => ctx.measureText(item).width);
  const maxWidth = Math.max(...widthList);
  const index = widthList.indexOf(maxWidth);

  if (index !== -1) {
    maxText = textList[index];
  }

  // 文案宽度大于画板宽度
  if (maxWidth > width) {
    ctx.font = `normal ${fontWeight} ${width / maxText.length}px '${fontFamily}'`;
  }

  // 获取行号
  const lineHeight = fontSize + 5;
  // 计算水印在y轴上的初始位置
  let initY = (height - (fontSize * textList.length + (textList.length - 1) * 5)) / 2;
  initY = initY < 0 ? 0 : initY;

  for (let i = 0; i < textList.length; i ++) {
    ctx.fillText(textList[i], width / 2, initY + (lineHeight * i));
  }

  return ctx.canvas.toDataURL();
}

/**
 * 获取背景图片，通过SVG
 * @param text
 * @param param1
 */
export function getDrawPatternBySvg(
  text: string | string[],
  {
    width,
    height,
    rotate,
    fontSize,
    opacity,
    fontWeight,
    fontFamily,
    fontColor
  }: Options
) {
  const svg = `<svg xmlns="namespace" width="${width}" height="${height}">
        <text x="50%" y="50%" dy="12px"
          text-anchor="middle"
          stroke="#000000"
          stroke-width="1"
          stroke-opacity="${opacity}"
          fill="none"
          transform="rotate(-45, 120 120)"
          style="font-size: ${fontSize};">
          ${text}
        </text>
  </svg>`;

  return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svg)))}`;
}
