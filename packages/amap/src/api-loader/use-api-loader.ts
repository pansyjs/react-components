import { useState, useEffect } from 'react';
import { requireScript } from '../utils/require-script';

export interface Options {
  /**
   * 加载高德API的Key
   * https://lbs.amap.com/api/javascript-api/guide/abc/prepare
   */
  mapKey?: string;
  /**
   * 高德API的版本
   * @default 1.4.15
   */
  version?: string;
  /**
   * 是否加载高德UI组件库
   * @default false
   */
  mapUI?: boolean;
  /**
   * 加载高德API的协议, 默认使用当前网站协议
   */
  protocol?: 'http' | 'https';
  /**
   * 加载高德API的前半部分
   * @default webapi.amap.com/maps
   */
  hostAndPath?: string;
}

/**
 * 高德地图加载完成的回调
 */
const callback: string = '__amap_init_callback';
const defaultOpts: Options = {
  mapKey: 'f97efc35164149d0c0f299e7a8adb3d2',
  version: '1.4.15',
  mapUI: false,
  hostAndPath: 'webapi.amap.com/maps',
}
function getScriptSrc(opts: Options): string {
  return `${opts.protocol || ''}//${opts.hostAndPath}?v=${opts.version}&key=${opts.mapKey}&callback=${callback}`
}

const useApiLoader = (opts: Options) => {
  // 是否在加载中
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const options = {...defaultOpts, ...opts}

  useEffect(
    () => {
      loadMap()
        .then((result) => {
          setLoaded(!!result);
        });
    },
    []
  );

  const loadMap = async () => {
    const apiSrc = getScriptSrc(options);
    const uiSrc = `${options?.protocol || ''}//webapi.amap.com/ui/1.0/main-async.js`;

    try {
      await requireScript(apiSrc);

      if (options.mapUI) {
        await requireScript(uiSrc);
      }

      window[callback] = () => {
        setLoaded(true);
        // delete window[callback];
      }

      return true;
    } catch (e) {
      setError(e);
      return false;
    }
  }

  return {
    loaded,
    error
  }
}

export default useApiLoader;
