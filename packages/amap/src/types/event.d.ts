/// <reference types="@pansy/amap-types" />

declare namespace AMap {
  interface MapEventMap {
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

  interface MarkerEventMap<I = Marker> {
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

  interface InfoWindowEventMap<I = any> {
    onChange: Event<'change', { target: I }>;
    onOpen: Event<'open', { target: I }>;
    onClose: Event<'close', { target: I }>;
  }

  interface AutoCompleteEventMap {
    onComplete: Event<'complete', SearchResult | { info: string }>;
    onError: Event<'error', { info: string }>;
    onSelect: Event<'select', { tip: Tip }>;
    onChoose: Event<'choose', { tip: Tip }>;
  }

  interface MouseToolEventMap<T extends ShapeOverlay = any> {
    /**
    * 鼠标工具绘制覆盖物结束时触发此事件，instance对象为绘制出来的覆盖物对象。
    */
   onDraw: (type: string, instance: T) => void;
 }
}
