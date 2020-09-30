import React from 'react';
import { render } from 'react-dom';
import { isFunction } from '../utils';
import { MarkerAllProps, getPropValue, renderMarkerComponent } from '../utils/marker';

export interface MarkersProps extends AMap.MapChildProps {
  visiable?: boolean;
  /**
   * 是否启用标记点聚合插件；如果是MarkerClustererOptions对象，表明启用
   */
  useCluster?: AMap.MarkerClusterer.Options | boolean;
  /**
   * 数组每一项都是都应标记点的属性或者其他自定义数据配置
   */
  markers?: AMap.Marker.Options[];
  /**
   * 根据传入的 MarkerOption 返回一个 React 组件，或者返回false
   */
  render?: (data: AMap.Marker.Options) => React.ReactNode | false;
  /**
   * 创建事件
   */
  onCreated?: (markers: AMap.Marker[]) => void;
}

const defaultOpts = {
  useCluster: false,
  markersCache: [],
  markerIDCache: []
};
const SCALE = 0.8;
const SIZE_WIDTH = 32 * SCALE;
const SIZE_HEIGHT = 46 * SCALE - 2;
const SIZE_HOVER_WIDTH = 46 * SCALE;
const SIZE_HOVER_HEIGHT = 66 * SCALE - 2;
const MAX_INFO_MARKERS = 42;
const IdKey = '__react_amap__';

const ClusterProps = [
  'gridSize',
  'minClusterSize',
  'maxZoom',
  'averageCenter',
  'styles',
  'zoomOnClick',
  'renderCluserMarker'
];

class Markers extends React.Component<MarkersProps> {
  private map: AMap.Map;
  private AMap: MarkersProps['AMap'];
  private element: HTMLElement;
  private markersCache: AMap.Marker[];
  private markerIDCache: number[];
  private useCluster: boolean;
  private resetOffset: AMap.Pixel;
  private hoverOffset: AMap.Pixel;
  private mapCluster!: AMap.MarkerClusterer;
  private markerReactChildDOM: any;

  constructor(props: MarkersProps) {
    super(props);

    this.map = props.map as AMap.Map;
    this.AMap = props.AMap;
    this.element = this.map.getContainer() as HTMLElement;
    this.markersCache = defaultOpts.markersCache;
    this.useCluster = false;
    this.markerIDCache = defaultOpts.markerIDCache;
    this.resetOffset = new this.AMap.Pixel(-SIZE_WIDTH / 2, -SIZE_HEIGHT);
    this.hoverOffset = new this.AMap.Pixel(-SIZE_HOVER_WIDTH / 2, -SIZE_HOVER_HEIGHT);

    console.log(this.map);

    this.createMarkers(props);
  }

  componentDidMount() {
    if (this.map) {
      this.setMarkerChild();
    }
  }

  componentWillReceiveProps(nextProps: MarkersProps) {
    if (this.map) {
      this.refreshMarkersLayout(nextProps);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  refreshMarkersLayout(nextProps: MarkersProps) {
    const markerChanged = (nextProps.markers !== this.props.markers);
    const clusterChanged = ((!!this.props.useCluster) !== (!!nextProps.useCluster));
    if (markerChanged) {
      this.markersCache.length && this.markersCache.forEach((marker) => {
        if (marker) {
          marker.setMap(null);
          // @ts-ignore
          marker = null;
        }
      });
      this.markersCache = defaultOpts.markersCache;
      this.createMarkers(nextProps);
      this.setMarkerChild();
    }
    // if (markerChanged || (clusterChanged)) {
    //   if (this.markersWindow) {
    //     this.markersWindow.close();
    //   }
    // }
    if (clusterChanged) {
      this.checkClusterSettings(nextProps);
    }
  }

  setMarkerChild() {
    Object.keys(this.markerReactChildDOM).forEach((idx) => {
      const dom = this.markersCache[idx].getContent();
      const child = this.markerReactChildDOM[idx];
      this.renderMarkerChild(dom, child);
    });
  }

  renderMarkerChild(dom: HTMLElement, child: any) {
    render(<div>{child}</div>, dom);
  }

  createMarkers(props: MarkersProps) {
    const markers = props.markers || [];

    const mapMarkers: AMap.Marker[] = [];
    const markerReactChildDOM = {};

    markers.length && markers.forEach((item, idx) => {
      const options = this.buildCreateOptions(props, item, idx);
      options['map'] = this.map;

      let markerContent = null;
      if (isFunction(props.render)) {
        let markerChild = props.render(item);
        if (markerChild !== false) {
          const div = document.createElement('div');
          div.setAttribute(IdKey, '1');
          markerContent = div;
          markerReactChildDOM[idx] = markerChild;
        }
      }

      if (!markerContent) {
        markerContent = document.createElement('div');
        const img = document.createElement('img');
        img.src = '//webapi.amap.com/theme/v1.3/markers/n/mark_bs.png';
        markerContent.appendChild(img);
      }
      options['content'] = markerContent;

      const marker = new window.AMap.Marker(options);
      marker.on('click', (e) => { this.onMarkerClick(e); });
      marker.on('mouseover', (e) => { this.onMarkerHover(e); });
      marker.on('mouseout', (e) => { this.onMarkerHoverOut(e); });

      marker['render'] = (function(marker) {
        return function(component: React.ReactNode) {
          return renderMarkerComponent(component, marker);
        };
      }(marker));

      this.bindMarkerEvents(marker);
      mapMarkers.push(marker);
    });
    this.markersCache = mapMarkers;
    this.markerReactChildDOM = markerReactChildDOM;
    this.exposeMarkerInstance();

    this.checkClusterSettings(props);
  }

  checkClusterSettings(props: MarkersProps) {
    if (props.useCluster) {
      this.loadClusterPlugin(props.useCluster)
        .then((cluster) => {
          cluster.setMarkers(this.markersCache);
        });
    } else {
      if (this.mapCluster) {
        const markers = this.mapCluster.getMarkers();
        this.mapCluster.clearMarkers();
        markers.forEach((marker) => {
          marker.setMap(this.map);
        });
      }
    }
  }

  loadClusterPlugin(clusterConfig: AMap.MarkerClusterer.Options | boolean): Promise<AMap.MarkerClusterer> {
    if (this.mapCluster) {
      return Promise.resolve(this.mapCluster);
    }
    const config = (typeof clusterConfig === 'boolean') ? {} : clusterConfig;
    return new Promise((resolve) => {
      this.map.plugin(['AMap.MarkerClusterer'], () => {
        resolve(this.createClusterPlugin(config));
      });
    });
  }

  createClusterPlugin(config: AMap.MarkerClusterer.Options) {
    let options = {};

    const defalutOptions: Object = {
      minClusterSize: 2,
      zoomOnClick: false,
      maxZoom: 18,
      gridSize: 60,
      averageCenter: true
    };

    ClusterProps.forEach((key) => {
      if (key in config) {
        options[key] = config[key];
      } else {
        options[key] = defalutOptions[key];
      }
    });

    this.mapCluster = new this.AMap.MarkerClusterer(this.map, [], options);
    let events = {};
    // if ('events' in config) {
    //   events = config.events;
    //   if ('created' in events) {
    //     events.created(this.mapCluster);
    //   }
    // }
    // this.bindClusterEvent(events);
    return this.mapCluster;
  }

  exposeMarkerInstance() {
    const { onCreated } = this.props;

    if (onCreated && isFunction(onCreated)) {
      onCreated(this.markersCache);
    }
  }

  buildCreateOptions(props: MarkersProps, raw: AMap.Marker.Options, idx: number) {
    const result = {};
    // 强制用户通过 render 函数来定义外观
    // const disabledKeys = ['label', 'icon', 'content'];
    // 还是不强制好，通过覆盖的方式来(如果有 render，覆盖 content/icon);
    const disabledKeys = ['extData'];
    MarkerAllProps.forEach((key) => {
      if ((key in raw) && (disabledKeys.indexOf(key) === -1)) {
        result[key] = getPropValue(key, raw[key]);
      } else if (key in props) {
        if (isFunction(props[key])) {
          const tmpValue = props[key].call(null, raw, idx);
          result[key] = getPropValue(key, tmpValue);
        } else {
          result[key] = getPropValue(key, props[key]);
        }
      }
    });
    result['extData'] = raw;
    return result;
  }

  triggerMarkerClick(e: any, marker: Object) {
    const events = this.props['events'] || {};
    if (isFunction(events.click)) {
      events.click(e, marker);
    }
  }

  setMarkerHoverOut(e: any, marker: Object) {
    this.triggerMarkerHoverOut(e, marker);
  }

  setMarkerHovered(e: any, marker: Object) {
    this.triggerMarkerHover(e, marker);
  }

  triggerMarkerHover(e: any, marker: Object) {
    // const raw = marker.getExtData();
    const events = this.props['events'] || {};
    if (isFunction(events.mouseover)) {
      events.mouseover(e, marker);
    }
  }

  triggerMarkerHoverOut(e: any, marker: Object) {
    const events = this.props['events'] || {};
    if (isFunction(events.mouseout)) {
      events.mouseout(e, marker);
    }
  }

  onMarkerClick(e: any) {
    const marker = e.target;
    this.triggerMarkerClick(e, marker);
  }

  onMarkerHover(e: any) {
    e.target.setTop(true);
    this.setMarkerHovered(e, e.target);
  }

  onMarkerHoverOut(e: any) {
    e.target.setTop(false);
    this.setMarkerHoverOut(e, e.target);
  }
  bindMarkerEvents(marker: AMap.Marker) {
    const events = this.props['events'] || {};
    const list = Object.keys(events);
    const preserveEv = ['click', 'mouseover', 'mouseout', 'created'];
    list.length && list.forEach((evName) => {
      if (preserveEv.indexOf(evName) === -1) {
        marker.on(evName, events[evName]);
      }
    });
  }

  render() {
    return null;
  }
}

export default Markers;
