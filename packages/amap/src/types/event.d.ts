/// <reference types="@pansy/amap-types" />

declare namespace AMap {
  interface MapEventMap {
    onClick: (event: AMap.Map.EventMap['click']) => void;
    onDblClick: (event: AMap.Map.EventMap['dblclick']) => void;
    onRightClick: (event: AMap.Map.EventMap['rightclick']) => void;
    onRdblclick: (event: AMap.Map.EventMap['rdblclick']) => void;
    onMouseUp: (event: AMap.Map.EventMap['mouseup']) => void;
    onMouseDown: (event: AMap.Map.EventMap['mousedown']) => void;
    onMouseMove: (event: AMap.Map.EventMap['mousemove']) => void;
    onMouseWheel: (event: AMap.Map.EventMap['mousewheel']) => void;
    onMouseOver: (event: AMap.Map.EventMap['mouseover']) => void;
    onMouseOut: (event: AMap.Map.EventMap['mouseout']) => void;
    onTouchStart: (event: AMap.Map.EventMap['touchstart']) => void;
    onTouchMove: (event: AMap.Map.EventMap['touchmove']) => void;
    onTouchEnd: (event: AMap.Map.EventMap['touchend']) => void;
    onContextMenu: (event: AMap.Map.EventMap['contextmenu']) => void;

    onHotspotClick: (event: AMap.Map.EventMap['hotspotclick']) => void;
    onHotspotOver: (event: AMap.Map.EventMap['hotspotover']) => void;
    onHotspotOut: (event: AMap.Map.EventMap['hotspotout']) => void;

    onComplete: (event: AMap.Map.EventMap['complete']) => void;
    onMapMove: (event: AMap.Map.EventMap['mapmove']) => void;
    onMoveStart: (event: AMap.Map.EventMap['movestart']) => void;
    onMoveEnd: (event: AMap.Map.EventMap['moveend']) => void;
    onZoomChange: (event: AMap.Map.EventMap['zoomchange']) => void;
    onZoomStart: (event: AMap.Map.EventMap['zoomstart']) => void;
    onZoomEnd: (event: AMap.Map.EventMap['zoomend']) => void;
    onDragStart: (event: AMap.Map.EventMap['dragstart']) => void;
    onDragging: (event: AMap.Map.EventMap['dragging']) => void;
    onDragEnd: (event: AMap.Map.EventMap['dragend']) => void;
    onResize: (event: AMap.Map.EventMap['resize']) => void;
  }

  interface MarkerEventMap {
    onClick: (event: AMap.Marker.EventMap['click']) => void;
    onDblClick: (event: AMap.Marker.EventMap['dblclick']) => void;
    onRightClick:(event: AMap.Marker.EventMap['rightclick']) => void;
    onMouseMove:(event: AMap.Marker.EventMap['mousemove']) => void;
    onMouseOver: (event: AMap.Marker.EventMap['mouseover']) => void;
    onMouseOut: (event: AMap.Marker.EventMap['mouseout']) => void;
    onMouseDown: (event: AMap.Marker.EventMap['mousedown']) => void;
    onMouseUp: (event: AMap.Marker.EventMap['mouseup']) => void;
    onDragStart: (event: AMap.Marker.EventMap['dragstart']) => void;
    onDragging: (event: AMap.Marker.EventMap['dragging']) => void;
    onDragEnd: (event: AMap.Marker.EventMap['dragend']) => void;
    onMoving: (event: AMap.Marker.EventMap['moving']) => void;
    onMoveEnd: (event: AMap.Marker.EventMap['moveend']) => void;
    onMoveAlong: (event: AMap.Marker.EventMap['movealong']) => void;
    onTouchStart: (event: AMap.Marker.EventMap['touchstart']) => void;
    onTouchMove: (event: AMap.Marker.EventMap['touchmove']) => void;
    onTouchEnd: (event: AMap.Marker.EventMap['touchend']) => void;
  }

  interface InfoWindowEventMap {
    onChange: (event: AMap.InfoWindow.EventMap<AMap.InfoWindow>['change']) => void;
    onOpen: (event: AMap.InfoWindow.EventMap<AMap.InfoWindow>['open']) => void;
    onClose: (event: AMap.InfoWindow.EventMap<AMap.InfoWindow>['close']) => void;
  }

  interface AutoCompleteEventMap {
    onComplete: (event: AMap.Autocomplete.EventMap['complete']) => void;
    onError: (event: AMap.Autocomplete.EventMap['error']) => void;
    onSelect: (event: AMap.Autocomplete.EventMap['select']) => void;
    onChoose: (event: AMap.Autocomplete.EventMap['choose']) => void;
  }

  interface MouseToolEventMap<T extends ShapeOverlay = any> {
    /**
    * 鼠标工具绘制覆盖物结束时触发此事件，instance对象为绘制出来的覆盖物对象。
    */
    onDraw: (event: { type: string, instance: T }) => void;
  }

  interface PolygonEventMap {
    onHide: (event: { type: 'hode', target: AMap.Polygon  }) => void;
    onShow: (event: { type: 'show', target: AMap.Polygon  }) => void;
    onClick: (event: AMap.Polygon.EventMap['click']) => void;
    onDblClick: (event: AMap.Polygon.EventMap['dblclick']) => void;
    onRightClick: (event: AMap.Polygon.EventMap['rightclick']) => void;
    onMouseOver: (event: AMap.Polygon.EventMap['mouseover']) => void;
    onMouseOut: (event: AMap.Polygon.EventMap['mouseout']) => void;
    onMouseDown: (event: AMap.Polygon.EventMap['mousedown']) => void;
    onMouseUp: (event: AMap.Polygon.EventMap['mouseup']) => void;
    onTouchStart: (event: AMap.Polygon.EventMap['touchstart']) => void;
    onTouchMove: (event: AMap.Polygon.EventMap['touchmove']) => void;
    onTouchEnd: (event: AMap.Polygon.EventMap['touchend']) => void;
  }
}
