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
    __amap_init_callback: () => void;
  }
}

declare namespace AMap {
  export interface MapChildProps {
    /**
     * 实例化后的地图对象
     */
    map?: AMap.Map;
    AMap?: AMap;
  }

  export type PositionType =
    AMap.LngLat |
    [number, number] |
    { lng: number; lat: number } |
    { longitude: number, latitude: number };

  export interface MapEventMap {
    onClick: MapsEvent<'click', Map>;
    onDblClick: MapsEvent<'dblclick', Map>;
    onRightClick: MapsEvent<'rightclick', Map>;
    onRdblclick: MapsEvent<'rdblclick', Map>;
    onMouseUp: MapsEvent<'mouseup', Map>;
    onMouseDown: MapsEvent<'mousedown', Map>;
    onMouseMove: MapsEvent<'mousemove', Map>;
    onMouseWheel: MapsEvent<'mousewheel', Map>;
    onMouseOver: MapsEvent<'mouseover', Map>;
    onMouseOut: MapsEvent<'mouseout', Map>;
    onTouchStart: MapsEvent<'touchstart', Map>;
    onTouchMove: MapsEvent<'touchmove', Map>;
    onTouchEnd: MapsEvent<'touchend', Map>;
    onContextMenu: MapsEvent<'contextmenu', Map>;

    onHotspotClick: HotspotEvent<'hotspotclick'>;
    onHotspotOver: HotspotEvent<'hotspotover'>;
    onHotspotOut: HotspotEvent<'hotspotout'>;

    onComplete: Event<'complete'>;
    onMapMove: Event<'mapmove'>;
    onMoveStart: Event<'movestart'>;
    onMoveEnd: Event<'moveend'>;
    onZoomChange: Event<'zoomchange'>;
    onZoomStart: Event<'zoomstart'>;
    onZoomEnd: Event<'zoomend'>;
    onDragStart: Event<'dragstart'>;
    onDragging: Event<'dragging'>;
    onDragEnd: Event<'dragend'>;
    onResize: Event<'resize'>;
}

  export interface MarkerEventMap<I = Marker> {
    onClick: MapsEvent<'click', I>;
    onDblClick: MapsEvent<'dblclick', I>;
    onRightClick: MapsEvent<'rightclick', I>;
    onMouseMove: MapsEvent<'mousemove', I>;
    onMouseOver: MapsEvent<'mouseover', I>;
    onMouseOut: MapsEvent<'mouseout', I>;
    onMouseDown: MapsEvent<'mousedown', I>;
    onMouseUp: MapsEvent<'mouseup', I>;
    onDragStart: MapsEvent<'dragstart', I>;
    onDragging: MapsEvent<'dragging', I>;
    onDragEnd: MapsEvent<'dragend', I>;
    onMoving: Event<'moving', { passedPath: LngLat[]; }>;
    onMoveEnd: Event<'moveend'>;
    onMoveAlong: Event<'movealong'>;
    onTouchStart: MapsEvent<'touchstart', I>;
    onTouchMove: MapsEvent<'touchmove', I>;
    onTouchEnd: MapsEvent<'touchend', I>;
  }
}
