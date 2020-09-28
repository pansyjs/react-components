/// <reference types="amap-js-api" />
/// <reference types="amap-js-api-scale" />
/// <reference types="amap-js-api-tool-bar" />
/// <reference types="amap-js-api-map-type" />
/// <reference types="amap-js-api-overview" />
/// <reference types="amap-js-api-control-bar" />
/// <reference types="amap-js-api-heatmap" />

declare global {
  interface Window {
    AMap: AMap.Map;
  }
}
