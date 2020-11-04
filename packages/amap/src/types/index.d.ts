/// <reference types="@pansy/amap-types" />
/// <reference types="./event" />

interface Window {
  AMap: typeof AMap;
  AMapUI: any;
  Loca: any;
  __amap_init_callback?: (error?: Error) => void;
}

declare namespace AMap {
  interface MapChildProps {
    /**
     * 实例化后的地图对象
     */
    map?: AMap.Map;
    AMap?: AMap;
  }

  type PositionType =
    AMap.LngLat |
    [number, number] |
    { lng: number; lat: number } |
    { longitude: number, latitude: number };

  type OffsetType =
    AMap.Pixel |
    [number, number] |
    { x: number, y: number };
}
