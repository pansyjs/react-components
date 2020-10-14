// export type MapItem<T extends Object> =

/**
 * Get the union type of all the keys in an object type `T`
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 *
 * // Expect: "name" | "age" | "visible"
 * type PropsKeys = Keys<Props>;
 */
export type Keys<T extends object> = keyof T;

export type NonUndefined<A> = A extends undefined ? never : A;

export type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];


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

export type OffsetType =
  AMap.Pixel |
  [number, number] |
  { x: number, y: number };

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

export interface InfoWindowEventMap<I = any> {
  onChange: Event<'change', { target: I }>;
  onOpen: Event<'open', { target: I }>;
  onClose: Event<'close', { target: I }>;
}

export interface AutoCompleteEventMap {
  onComplete: Event<'complete', SearchResult | { info: string }>;
  onError: Event<'error', { info: string }>;
  onSelect: Event<'select', { tip: Tip }>;
  onChoose: Event<'choose', { tip: Tip }>;
}

export interface MouseToolEventMap<T extends ShapeOverlay = any> {
   /**
   * 鼠标工具绘制覆盖物结束时触发此事件，instance对象为绘制出来的覆盖物对象。
   */
  onDraw: (type: string, instance: T) => void;
}

