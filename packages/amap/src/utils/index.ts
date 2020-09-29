/*
 * 将经纬度转换为LngLat对象
 * [lng, lat]
 * {lng, lat}
 * {longitude, latitude}
 */
export const toLnglat = (position: AMap.PositionType): AMap.LngLat => {
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
  return new window.AMap.LngLat(lng, lat);
}
