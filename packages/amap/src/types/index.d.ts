/// <reference types="@pansy/amap-types" />
/// <reference types="./circle-marker" />
/// <reference types="./mouse-tool" />
/// <reference types="./marker-clusterer" />

declare global {
  interface Window {
    AMap: AMap.Map;
    AMapUI: any;
    Loca: any;
    __amap_init_callback?: (error?: Error) => void;
  }
}

export {};
