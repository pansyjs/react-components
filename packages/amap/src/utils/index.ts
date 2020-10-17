import { PositionType, OffsetType } from '../types/global';

export const hasWindow = (typeof window !== 'undefined')

/**
 * 判断是否是方法
 * @param data
 */
export const isFunction = (value: any): value is Function => {
  return !!value && (typeof value === 'function');
}

/*
 * 将经纬度转换为LngLat对象
 * [lng, lat]
 * {lng, lat}
 * {longitude, latitude}
 */
export const toLnglat = (position: PositionType) => {
  if (!position) {
    return position
  }
  // 高德原生 AMap.LngLat 类
  if ('getLng' in position && 'getLat' in position) {
    return position
  }
  let lng = 0
  let lat = 0
  if (({}).toString.call(position) === '[object Array]') {
    lng = position[0]
    lat = position[1]
  } else if ('lng' in position && 'lat' in position) {
    lng = position.lng
    lat = position.lat
  } else if ('longitude' in position && 'latitude' in position) {
    lng = position.longitude
    lat = position.latitude
  }
  return hasWindow ? new window.AMap.LngLat(lng, lat) : undefined
}

/**
 * 将偏移量转换为Pixel
 * @param offset
 */
export const toPixel = (offset: OffsetType) => {
  if (!offset) {
    return offset
  }
  if ('getX' in offset && 'getY' in offset) {
    return offset
  }
  let x = 0
  let y = 0
  if (({}).toString.call(offset) === '[object Array]') {
    x = offset[0]
    y = offset[1]
  } else if ('x' in offset && 'y' in offset) {
    x = offset['x'];
    y = offset['y'];
  }
  return hasWindow ? new window.AMap.Pixel(x, y) : undefined
}
