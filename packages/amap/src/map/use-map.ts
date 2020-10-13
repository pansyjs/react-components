import { useEffect, useState, useRef } from 'react';
import { MapProps, PluginName, PluginObjType } from './map';
import { useSetStatus, useSetProperties, useEventProperties } from '../hooks';
import { Keys, MapEventMap } from '../types/global';
import { isFunction } from '../utils';
import AMapLoader from '../utils/api-loader';
import { toLnglat } from '../utils';

interface UseMap extends MapProps {
  /**
   * 指定的容器
   */
  container?: HTMLDivElement;
}

interface UseMapResult {
  map: AMap.Map,
  setContainer: any
}

const mapStatus: Keys<AMap.Map.Status>[] = [
  'animateEnable',
  'doubleClickZoom',
  'dragEnable',
  'isHotspot',
  'jogEnable',
  'keyboardEnable',
  'pitchEnable',
  'resizeEnable',
  'rotateEnable',
  'scrollWheel',
  'touchZoom',
  'zoomEnable'
];

const properties: string[] = [
  // 'zoom', zoom 已单独实现，无需设置
  'labelzIndex',
  'layers',
  'center',
  'city',
  'bounds',
  'limitBounds',
  'lang',
  'rotation',
  'defaultCursor',
  'mapStyle',
  'features',
  'defaultLayer',
  'pitch'
];

// AMap.Map.EventMap
const eventNames: Keys<MapEventMap>[] = [
  'onClick',
  'onDblClick',
  'onRightClick',
  'onRdblclick',
  'onMouseUp',
  'onMouseDown',
  'onMouseMove',
  'onMouseWheel',
  'onMouseOver',
  'onMouseOut',
  'onTouchStart',
  'onTouchMove',
  'onTouchEnd',
  'onContextMenu',
  'onHotspotClick',
  'onHotspotOver',
  'onHotspotOut',
  'onComplete',
  'onMapMove',
  'onMoveStart',
  'onMoveEnd',
  'onZoomChange',
  'onZoomStart',
  'onZoomEnd',
  'onDragStart',
  'onDragging',
  'onDragEnd',
  'onResize'
];

const pluginList: PluginName[] = [
  'Scale',
  'ToolBar',
  'MapType',
  'OverView',
  'ControlBar'
];

const pluginDefaultOpts = {
  MapType: {
    showRoad: false,
    showTraffic: false,
    defaultType: 0
  },
  ToolBar: {
    position: 'RB',
    noIpLocate: true,
    locate: true,
    liteStyle: true,
    autoPosition: false
  },
  OverView: {},
  ControlBar: {}
}

// type Properties = FunctionKeys<AMap.Map>

const useMap = (props: UseMap = {}): UseMapResult => {
  const pluginMap = useRef<{[key: string]: any}>({});
  const [mapInstance, setMapInstance] = useState<AMap.Map>();
  const [zoom, setZoom] = useState(props.zoom || 15);
  const [container, setContainer] = useState<HTMLDivElement>(props.container as HTMLDivElement);

  useEffect(
    () => {
      if (!mapInstance && container) {
        new AMapLoader()
          .load()
          .then((AMap) => {
            setMapInstance(new AMap.Map(container, { zoom, ...props } as AMap.Map.Options));
          })
      }

      return () => {
        if (mapInstance) {
          mapInstance.destroy();
        }
      }
    },
    [container, mapInstance]
  );

  useEffect(
    () => {
      if (
        mapInstance &&
        typeof props.zoom === 'number' &&
        zoom !== props.zoom &&
        props.zoom >= 2 && props.zoom <= 20
      ) {
        setZoom(props.zoom);
        mapInstance.setZoom(props.zoom);
      }
    },
    [zoom, props.zoom]
  );

  useEffect(
    () => {
      if (!mapInstance) return;
      const pluginArr: PluginName[] = [...pluginList];
      const plugins = props.plugins || [];

      if (plugins && plugins.length) {
        plugins.forEach((item) => {
          let name: PluginName;
          let config: PluginObjType['options'] = {};
          let visible: boolean;

          if (typeof item === 'string') {
            name = item
            config = {}
            visible = true
          } else {
            name = item.name
            config = item.options || {}
            visible = (('visible' in config) && (typeof config.visible === 'boolean')) ? config.visible : true
            // @ts-ignore
            delete config.visible
          }
          const idx = pluginArr.indexOf(name)
          if (idx !== -1 && visible) {
            pluginArr.splice(idx, 1)
            installPlugin(name, config);
          }
        });

        removeOrDisablePlugins(pluginArr);
      }

      return () => {
        Object.keys(pluginMap.current || {})
          .forEach(item => {
            removePlugin(item);
          });
      }
    },
    [props.plugins, mapInstance]
  );

  const removePlugin = (name: string) => {
    switch (name) {
      case 'Scale':
      case 'ToolBar':
      case 'MapType':
      case 'ControlBar':
      case 'OverView':
        if (mapInstance && pluginMap.current[name]) {
          mapInstance.removeControl(pluginMap.current[name]);
          pluginMap.current[name] = undefined;
        }
        break
      default:
      // do nothing
    }
  }

  const installPlugin = (
    name: string,
    opts: PluginObjType['options'] = {}
  ) => {
    switch (name) {
      case 'Scale':
      case 'ToolBar':
      case 'OverView':
      case 'MapType':
        setMapPlugin(name, opts)
        break
      case 'ControlBar':
        setControlBar(opts)
        break
      default:
      // do nothing
    }
  }

  const removeOrDisablePlugins = (plugins: PluginName[]) => {
    if (plugins && plugins.length) {
      plugins.forEach((item) => {
        if (item in pluginMap.current) {
          // ControlBar has no 'hide' method
          if (item === 'ControlBar') {
            mapInstance!.removeControl(pluginMap.current[item]);
            delete pluginMap.current[item];
          } else {
            pluginMap.current[item].hide()
          }
        }
      })
    }
  }

  const setMapPlugin = (name: string, opts: PluginObjType['options']) => {
    if (pluginMap.current[name]) {
      pluginMap.current[name].show()
    } else {
      const { onCreated, ...restOpts } = opts
      const initOpts = {
        ...pluginDefaultOpts[name],
        ...restOpts
      };
      mapInstance!.plugin([`AMap.${name}`], () => {
        pluginMap.current[name] = new window.AMap[name](initOpts);
        mapInstance!.addControl(pluginMap.current[name]);
        if (isFunction(onCreated)) {
          onCreated(pluginMap.current[name])
        }
      })
    }
  }

  const setControlBar = (opts: PluginObjType['options']) => {
    if (pluginMap.current.ControlBar) {
      // do nothing
    } else {
      const { onCreated, ...restOpts } = opts
      const initOpts = {
        ...pluginDefaultOpts.ControlBar,
        ...restOpts
      };
      mapInstance!.plugin(['AMap.ControlBar'], () => {
        pluginMap.current.ControlBar = new window.AMap.ControlBar(initOpts as any);
        mapInstance!.addControl(pluginMap.current.ControlBar)
        if (isFunction(onCreated)) {
          onCreated(pluginMap.current.ControlBar)
        }
      })
    }
  }

  const center = toLnglat(props?.center as AMap.LngLat);

  // 设置地图状态
  useSetStatus<AMap.Map.Status, AMap.Map, UseMap>(mapInstance!, props, mapStatus);
  // 设置地图受控属性
  useSetProperties<AMap.Map, UseMap>(mapInstance!, { ...props, center }, properties);
  // 绑定事件
  useEventProperties<AMap.Map, UseMap>(mapInstance!, props, eventNames);

  return {
    map: mapInstance as AMap.Map,
    setContainer,
  }
}

export default useMap;
