import React from 'react';
import { render } from 'react-dom';
import { isFunction } from '../utils';
import { MarkerAllProps, getPropValue, renderMarkerComponent } from '../utils/marker';

export interface MarkerOptions extends Omit<AMap.Marker.Options, 'offset'| 'position'> {
  /**
   * 标记点偏移量
   */
  offset?: AMap.OffsetType;
  /**
   * 标记点位置
   */
  position?: AMap.PositionType;

  /**
   * 方便注入其他数据
   */
  [key: string]: any;
}

export interface ClustererOptions extends AMap.MarkerClusterer.Options {
  /**
   * 点击事件
   */
  onClick?: AMap.MarkerClusterer.EventMap['click'];
  /**
   * 创建事件
   */
  onCreated?: (clusterer: AMap.MarkerClusterer) => void;
}

export interface MarkersProps extends AMap.MapChildProps {
  visiable?: boolean;
  /**
   * 是否启用标记点聚合插件；如果是MarkerClustererOptions对象，表明启用
   */
  useCluster?: ClustererOptions | boolean;
  /**
   * 数组每一项都是都应标记点的属性或者其他自定义数据配置
   */
  markers?: MarkerOptions[];
  /**
   * 根据传入的 MarkerOption 返回一个 React 组件，或者返回false
   */
  render?: (data: MarkerOptions) => React.ReactNode | false;
  /**
   * 创建事件
   */
  onCreated?: (markers: AMap.Marker[]) => void;
}

const defaultOpts = {
  markersCache: []
};
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
  private markersCache: AMap.Marker[];
  private mapCluster!: AMap.MarkerClusterer;
  private markerReactChildDOM: {
    [id: number]: any
  };

  constructor(props: MarkersProps) {
    super(props);

    this.map = props.map as AMap.Map;
    this.AMap = props.AMap;
    this.markersCache = defaultOpts.markersCache;
    this.markerReactChildDOM = {}

    this.createMarkers(props);
  }

  componentDidMount() {
    if (this.map) {
      this.setMarkerChild();
    }
  }

  componentDidUpdate(nextProps: MarkersProps) {
    if (this.map) {
      this.refreshMarkersLayout(nextProps);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {  }

  refreshMarkersLayout(nextProps: MarkersProps) {
    const markerChanged = (nextProps.markers !== this.props.markers);
    const clusterChanged = ((!!this.props.useCluster) !== (!!nextProps.useCluster));
    if (markerChanged) {
      // 清除已有的标记点
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

  /**
   * 创建标记点
   * @param props
   */
  createMarkers(props: MarkersProps) {
    const markers = props.markers || [];

    const mapMarkers: AMap.Marker[] = [];
    const markerReactChildDOM = {};

    markers.forEach((item, index) => {
      const options = this.buildCreateOptions(props, item, index);
      options['map'] = this.map;

      // 自定义渲染
      let markerContent = null;
      if (isFunction(props.render)) {
        let markerChild = props.render(item);
        if (markerChild !== false) {
          const div = document.createElement('div');
          div.setAttribute(IdKey, '1');
          markerContent = div;
          markerReactChildDOM[index] = markerChild;
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

    if (isFunction(props.onCreated)) {
      props.onCreated(this.markersCache);
    }

    this.checkClusterSettings(props);
  }

  /**
   * 处理Cluster
   * @param props
   */
  checkClusterSettings(props: MarkersProps) {
    if (props.useCluster) {
      this.loadClusterPlugin(props.useCluster)
        .then((cluster) => {
          cluster.setMarkers(this.markersCache);
        });
    } else {
      // 关闭则提取出所有的标记点
      if (this.mapCluster) {
        const markers = this.mapCluster.getMarkers();
        this.mapCluster.clearMarkers();
        markers.forEach((marker) => {
          marker.setMap(this.map);
        });
      }
    }
  }

  /**
   * 加载 MarkerClusterer 插件
   * @param clusterConfig
   */
  loadClusterPlugin(
    clusterConfig: ClustererOptions | boolean
  ): Promise<AMap.MarkerClusterer> {
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

  /**
   * 创建 MarkerClusterer 实例
   * @param config
   */
  createClusterPlugin(config: ClustererOptions) {
    let options = {};

    const defalutOptions: ClustererOptions = {
      minClusterSize: 2,
      zoomOnClick: true,
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

    // 事件绑定
    if (isFunction(config.onCreated)) {
      config.onCreated(this.mapCluster);
    }

    // 事件绑定
    if (isFunction(config.onClick)) {
      this.mapCluster.on('click', config.onClick);
    }

    return this.mapCluster;
  }

  /**
   * 处理标记点参数
   * @param props
   * @param markerOpts
   * @param index
   */
  buildCreateOptions(props: MarkersProps, markerOpts: MarkerOptions, index: number) {
    const result = {};
    const disabledKeys = ['extData'];
    MarkerAllProps.forEach((key) => {
      if ((key in markerOpts) && (disabledKeys.indexOf(key) === -1)) {
        result[key] = getPropValue(key, markerOpts[key]);
      } else if (key in props) {
        if (isFunction(props[key])) {
          const tmpValue = props[key].call(null, markerOpts, index);
          result[key] = getPropValue(key, tmpValue);
        } else {
          result[key] = getPropValue(key, props[key]);
        }
      }
    });
    result['extData'] = markerOpts;
    return result;
  }

  triggerMarkerClick(e: any, marker: Object) {
    const events = this.props['events'] || {};
    if (isFunction(events.click)) {
      events.click(e, marker);
    }
  }

  bindMarkerEvents(marker: AMap.Marker) {
    const events = this.props['events'] || {};
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      marker.on(evName, events[evName]);
    });
  }

  render() {
    return null;
  }
}

export default Markers;
