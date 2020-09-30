/// <reference types="@pansy/amap-types" />
/// <reference types="./circle-marker" />
/// <reference types="./marker-clusterer" />

declare global {
  interface Window {
    AMap: AMap.Map;
    __amap_init_callback: () => void;
  }
}
