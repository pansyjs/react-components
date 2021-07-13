import React from 'react';
import { PlayerErrorEvent, PlayerConfig } from './types';
import './index.less';

export interface PlayerProps {
  prefixCls?: string;
  /** 自定义样式类 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  // 播放源
  source: string;
  // 是否是直播
  isLive?: boolean;
  // 用于在播放器加载成功前渲染
  loading?: React.ReactNode;
  /** 播放器配置 */
  options?: Partial<Omit<PlayerConfig, 'source' | 'isLive'>>;
  // aliplayer版本
  version?: string;
  // 是否隐藏控制栏
  hideControlbar?: boolean;
  changeSourceMode?: 'loadByUrl' | 'init',
  // 播放器CSS模板
  cssLinkTemplate?: string;
  // 播放器JS模板
  scriptSrcTemplate?: string;
  // 播放器视频初始化按钮渲染完毕
  onReady?: () => void;
  // 视频由暂停恢复为播放时触发
  onPlay?: () => void;
  // 视频暂停时触发
  onPause?: () => void;
  // 能够开始播放音频/视频时发生，会多次触发，仅H5播放器
  onCanplay?: () => void;
  // 播放中，会触发多次
  onPlaying?: () => void;
  // 当前视频播放完毕时触发
  onEnded?: () => void;
  // 直播流中断时触发
  onLiveStreamStop?: () => void;
  // m3u8直播流中断后重试事件
  onM3u8Retry?: () => void;
  // 控制栏自动隐藏事件
  onHideBar?: () => void;
  // 控制栏自动显示事件
  onShowBar?: () => void;
  // 数据缓冲事件
  onWaiting?: () => void;
  // 截图完成事件
  onSnapshoted?: () => void;
  // 播放位置发生改变时触发，仅H5播放器。
  // 可通过getCurrentTime方法，得到当前播放时间。
  onTimeupdate?: () => void;
  // 全屏事件，仅H5支持
  onRequestFullScreen?: () => void;
  // 取消全屏事件，iOS下不会触发，仅H5支持
  onCancelFullScreen?: () => void;
  // 错误事件
  onError?: (e: PlayerErrorEvent) => void;
}

interface PlayerState {
  // 播放器是否在加载中
  isLoading: boolean;
}

class Player extends React.Component<PlayerProps, PlayerState> {
  private playerId: string;
  private playerScriptId: string;
  private playerLinkId: string;
  private instance: any = null;

  static defaultProps: Partial<PlayerProps> = {
    prefixCls: 'pansy-aliplayer',
    hideControlbar: false,
    cssLinkTemplate: '//g.alicdn.com/de/prismplayer/{%version}/skins/default/aliplayer-min.css',
    scriptSrcTemplate: '//g.alicdn.com/de/prismplayer/{%version}/aliplayer-min.js',
    version: '2.9.7',
    options: {},
    changeSourceMode: 'init'
  };

  constructor(props: PlayerProps) {
    super(props);
    this.playerId = `aliplayer-${Math.floor(Math.random() * 1000000)}`;
    this.playerScriptId = 'ali-player-js';
    this.playerLinkId = 'ali-player-css';
    this.state = {
      isLoading: true
    };

    this.insertLinkTag();
  }

  componentDidMount() {
    this.init(this.props);
  }

  shouldComponentUpdate(nextProps: PlayerProps) {
    if (this.props.source !== nextProps.source) {
      if (this.props.changeSourceMode === 'init') {
        this.init(nextProps);
      } else {
        nextProps.source && this.loadByUrl(nextProps.source);
      }
      return false;
    }
    if (
      this.props.options !== nextProps.options ||
      this.props.isLive !== nextProps.isLive
    ) {
      this.init(this.props);
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    this.instance && this.instance.dispose();
  }

  private init = (props: PlayerProps) => {
    if (window['Aliplayer']) {
      this.setState({
        isLoading: false
      })
      this.initAliplayer(props);
    } else {
      this.insertScriptTag();
    }
  }

  /**
   * 获取阿里播放器的js路径
   */
  private getPath = (path: string, version: string): string => {
    return path.replace(/\{([^{]*?)%version(.*?)\}/g, version.toString());
  }

  private insertLinkTag = () => {
    const { cssLinkTemplate = '', version = '' } = this.props;
    const playerLinkTag = document.getElementById(this.playerLinkId) as HTMLLinkElement;

    if(!playerLinkTag) {
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = this.getPath(cssLinkTemplate, version);;
      link.id = this.playerLinkId;
      document.head.appendChild(link);
    }
  }

  private insertScriptTag = () => {
    const { scriptSrcTemplate = '', version = '' } = this.props;
    let document = window.document;

    let playerScriptTag = document.getElementById(this.playerScriptId) as HTMLScriptElement;

    if (!playerScriptTag) {
      playerScriptTag = document.createElement('script');
      playerScriptTag.type = 'text/javascript';
      playerScriptTag.charset = 'utf-8';
      playerScriptTag.src = this.getPath(scriptSrcTemplate, version);
      playerScriptTag.id = this.playerScriptId;

      document.body.appendChild(playerScriptTag);
    }

    playerScriptTag.addEventListener('load', () => {
      this.setState({
        isLoading: false
      })
      this.initAliplayer(this.props);
    });
  }

  private initEvents = () => {
    const {
      onReady,
      onPlay,
      onPause,
      onCanplay,
      onPlaying,
      onEnded,
      onError,
      onHideBar,
      onShowBar,
      onWaiting,
      onM3u8Retry,
      onSnapshoted,
      onTimeupdate,
      onLiveStreamStop,
      onCancelFullScreen,
      onRequestFullScreen
    } = this.props;

    if (!this.instance) return;
    onReady && this.instance.on('ready', onReady);
    onPlay && this.instance.on('play', onPlay);
    onPause && this.instance.on('pause', onPause);
    onCanplay && this.instance.on('canplay', onCanplay);
    onPlaying && this.instance.on('playing', onPlaying);
    onEnded && this.instance.on('ended', onEnded);
    onHideBar && this.instance.on('hideBar', onHideBar);
    onShowBar && this.instance.on('showBar', onShowBar);
    onWaiting && this.instance.on('waiting', onWaiting);
    onSnapshoted && this.instance.on('snapshoted', onSnapshoted);
    onTimeupdate && this.instance.on('timeupdate', onTimeupdate)
    onM3u8Retry && this.instance.on('onM3u8Retry', onM3u8Retry);
    onLiveStreamStop && this.instance.on('liveStreamStop', onLiveStreamStop);
    onCancelFullScreen && this.instance.on('cancelFullScreen', onCancelFullScreen);
    onRequestFullScreen && this.instance.on('requestFullScreen', onRequestFullScreen);
    onError && this.instance.on('error', onError);
  }

  private initAliplayer = (props: PlayerProps) => {
    const {
      source,
      options,
      isLive
    } = props;

    const config: Partial<PlayerConfig>  = {
      ...options,
      useH5Prism: true,
      id: this.playerId,
      source,
      isLive: !!isLive
    };

    if (!config.width) {
      config.width = '100%';
    }

    if (!config.height) {
      config.height = '100%';
    }

    if (config.autoplay === undefined) {
      config.autoplay = false;
    }

    // 销毁播放器
    this.instance && this.instance.dispose();
    // @ts-ignore
    const Aliplayer = window['Aliplayer'] || window.proxy.Aliplayer;
    this.instance = new Aliplayer(config);
    this.instance?.setVolume(0);
    this.initEvents();
  }

  /**
   * 获取播放器
   */
  getPlayer() {
    return this.instance;
  }

  /**
   * 播放视频
   */
  play() {
    this.instance?.play?.();
  }

  /**
   * 暂停视频
   */
  pause() {
    this.instance?.pause?.();
  }

  /**
   * 重播视频
   */
  replay() {
    this.instance?.replay?.();
  }

  /**
   * 跳转到某个时刻进行播放，time的单位为秒。
   * @param time
   * @return player
   */
  seek(time: number) {
    this.instance?.seek?.(time);
  }

  /**
   * 获取当前时间 单位秒
   * @param time
   */
  getCurrentTime() {
    return this.instance?.getCurrentTime?.();
  }

  /**
   * 获取视频总时长，返回的单位为秒
   */
  getDuration() {
    return this.instance?.getDuration?.();
  }

  /**
   * 获取当前的音量，返回值范围为0-1
   */
  getVolume() {
    return this.instance?.getVolume?.();
  }

  /**
   * 设置音量
   */
  setVolume(volume: number) {
    this.instance.setVolume(volume);
  }

  /**
   * 切换播放视频url，time为可选值（单位秒）目前只支持同种格式（mp4/flv/m3u8）之间切换暂不支持直播rtmp流切换
   * @param url 视频地址
   * @param time 跳转到多少秒
   */
  loadByUrl(url: string, time?: number) {
    this.instance?.loadByUrl?.(url, time);
  }

  /**
   * 获取播放器状态
   */
  getStatus() {
    return this.instance?.getStatus?.();
  }

  /**
   * 设置播放速度
   * @param speed
   */
  setSpeed(speed: number) {
    this.instance?.setSpeed?.(speed);
  }

  /**
   * 设置封面
   * @param cover
   */
  setCover(cover: string) {
    this.instance?.setCover?.(cover);
  }

  /**
   * 重新加载播放器
   */
  reloadPlayer = () => {
    this.initAliplayer(this.props);
  }

  render() {
    const { prefixCls, className, style, hideControlbar, loading } = this.props;

    const cls = [
      prefixCls,
      className,
      'prism-player',
      hideControlbar ? 'hide-controlbar' : null
    ].filter(item => item).join(' ').trim();

    return (
      <div className={cls} style={style} id={this.playerId}>
        {
          this.state.isLoading ? loading || null : null
        }
      </div>
    )
  }
}

export * from './types';
export default Player;
