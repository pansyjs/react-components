enum LoadStatus {
  /**
   * 未加载
   */
  notload = "notload",
  /**
   * 加载中
   */
  loading = "loading",
  /**
   * 已加载
   */
  loaded = "loaded",
  /**
   * 加载失败
   */
  failed = "failed",
}

interface Config {
  key: string;
  hostAndPath?: string;
  AMap: {
    version: string;
    plugins: string[];
  }
  AMapUI: {
    version: string;
    plugins: string[];
  },
  Loca: {
    version: string;
  }
}

export interface LoadOption {
  key: string;
  version?: string;
  hostAndPath?: string;
  plugins?: string[];
  AMapUI?: Partial<Config['AMapUI']>;
  Loca?: Partial<Config['Loca']>;
}

const headElement = document.head || document.getElementsByTagName('head')[0];
const _importedScript: { [src: string]: true } = {};

/**
 * load dependency by script tag
 */
export function requireScript(
  src: string,
  scriptId: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (src in _importedScript) {
      resolve();
      return
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = scriptId
    script.src = src;
    script.onerror = () => {
      headElement.removeChild(script);
      reject(new URIError(`The Script ${src} is no accessible.`));
    }
    script.onload = () => {
      _importedScript[src] = true;
      resolve();
    }
    headElement.appendChild(script);
  })
}

const defaultConfig: Config = {
  key: 'f97efc35164149d0c0f299e7a8adb3d2',
  hostAndPath: 'webapi.amap.com',
  AMap: {
    version: '1.4.15',
    plugins: [],
  },
  AMapUI: {
    version: '1.1',
    plugins: [],
  },
  Loca: {
    version: '1.3.2',
  },
}

let config: Config = JSON.parse(JSON.stringify(defaultConfig));
let statusMap: {
  AMap: LoadStatus;
  AMapUI: LoadStatus;
  Loca: LoadStatus;
} = {
  AMap: LoadStatus.notload,
  AMapUI: LoadStatus.notload,
  Loca: LoadStatus.notload
};
let callbackMap: {
  AMap: Function[];
  AMapUI: Function[];
  Loca: Function[];
} = {
  AMap: [],
  AMapUI: [],
  Loca: []
}

class APILoader {
  mapKey: string;

  constructor() {
    this.mapKey = '';
  }

  loadAMapUI = (params: LoadOption['AMapUI']): Promise<void> => {
    return new Promise((resolve, reject) => {
      const newPlugins: string[] = [];
      if (params?.plugins && params.plugins.length) {
        params.plugins.forEach(item => {
          if (!config.AMapUI.plugins.includes(item)) {
            newPlugins.push(item);
          }
        })
      }

      config.AMapUI.version = params?.version || config.AMapUI.version;
      const version = config.AMapUI.version;

      switch (statusMap.Loca) {
        case LoadStatus.failed:
          reject('上次请求 AMapUI 失败');
          break;
        case LoadStatus.notload:
          statusMap.AMapUI = LoadStatus.loading;
          const scriptSrc = `//${config.hostAndPath}/ui/${version}/main.js`;

          requireScript(scriptSrc, 'amap_loca_api')
            .then(() => {
              statusMap.AMapUI = LoadStatus.loaded;
              if (newPlugins.length) {
                window.AMapUI.loadUI(newPlugins, function () {
                  for (let i = 0, len = newPlugins.length; i < len; i++) {
                    const path = newPlugins[i];
                    const name = path.split('/').slice(-1)[0];
                    window.AMapUI[name] = arguments[i];
                  }
                  resolve();
                  while (callbackMap.AMapUI.length) {
                    callbackMap.AMapUI.splice(0, 1)[0]();
                  }
                });
              } else {
                resolve();
                while (callbackMap.AMapUI.length) {
                  callbackMap.AMapUI.splice(0, 1)[0]();
                }
              }
            })
            .catch(() => {
              statusMap.AMapUI = LoadStatus.failed;
              reject('请求 AMapUI 失败');
            })
          break;
        case LoadStatus.loaded:
          if (version && params?.version !== config.AMapUI.version) {
            reject('不允许多个版本 AMapUI 混用');
          } else {
            if (newPlugins.length) {
              window.AMapUI.loadUI(newPlugins, function () {
                for (let i = 0, len = newPlugins.length; i < len; i++) {
                  const path = newPlugins[i];
                  const name = path.split('/').slice(-1)[0];
                  window.AMapUI[name] = arguments[i];
                }
                resolve();
              });
            } else {
              resolve();
            }
          }
        case LoadStatus.loading:
          if (params?.version && params.version !== config.AMapUI.version) {
            reject('不允许多个版本 AMapUI 混用');
          } else {
              callbackMap.AMapUI.push((err: Error) => {
                if (err) {
                  reject(err);
                } else {
                  if (newPlugins.length) {
                    window.AMapUI.loadUI(newPlugins, function () {
                      for (let i = 0, len = newPlugins.length; i < len; i++) {
                          const path = newPlugins[i];
                          const name = path.split('/').slice(-1)[0];
                          window.AMapUI[name] = arguments[i];
                      }
                      resolve();
                    });
                  } else {
                    resolve();
                  }
                }
              });
          }

      }
    });
  }

  loadLoca = (params: LoadOption['Loca']): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (config.AMap.version.startsWith('2.')) {
        reject('Loca 暂不适配 JSAPI 2.0，请使用 1.4.15');
        return;
      }

      switch (statusMap.Loca) {
        case LoadStatus.failed:
          reject('上次请求 AMap 失败');
          break;
        case LoadStatus.notload:
          statusMap.Loca = LoadStatus.loading;

          const scriptSrc = `//${config.hostAndPath}/loca?v=${params?.version}&key=${this.mapKey}`;

          requireScript(scriptSrc, 'amap_loca_api')
            .then(() => {
              statusMap.Loca = LoadStatus.loaded;
              resolve();
              while (callbackMap.Loca.length) {
                callbackMap.Loca.splice(0, 1)[0]();
              }
            })
            .catch(() => {
              statusMap.Loca = LoadStatus.failed;
              reject('请求 Loca 失败');
            });
          break;
        case LoadStatus.loaded:
          if (params?.version && params.version !== config.Loca.version) {
            reject('不允许多个版本 Loca 混用');
          } else {
            resolve();
          }
          break;
        case LoadStatus.loading:
          if (params?.version && params.version !== config.Loca.version) {
            reject('不允许多个版本 Loca 混用');
          } else {
            callbackMap.Loca.push((err: Error) => {
              if (err) {
                reject(err);
              } else {
                reject();
              }
            });
          }
          break;
      }
    })
  }

  appendOther = (option: LoadOption): Promise<any> => {
    let pros: Promise<void>[] = [];
    if (option.AMapUI) {
      pros.push(this.loadAMapUI(option.AMapUI));
    }
    if (option.Loca) {
      pros.push(this.loadLoca(option.Loca));
    }
    return Promise.all(pros);
  }

  onload = (callback: Function) => {
    if (typeof callback == 'function') {
      if (statusMap.AMap === LoadStatus.loaded) {
          callback(window.AMap);
          return;
      }
      callbackMap.AMap.push(callback);
    }
  };

  load = (options: LoadOption = {} as LoadOption): Promise<typeof window.AMap> => {
    const that = this;
    // 提取新的插件
    const newPlugins: string[] = [];
    if (options?.plugins?.length) {
      options.plugins.forEach(item => {
        if (config.AMap.plugins.includes(item)) {
          newPlugins.push(item);
        }
      })
    }

    return new Promise((resolve, reject) => {
      const { key, version, plugins = [] } = options;
      switch (statusMap.AMap) {
        case LoadStatus.failed:
          reject('上次请求 AMap 失败');
          break;
        case LoadStatus.notload:
          config.key = key || config.key;
          this.mapKey = config.key;
          config.AMap.version = version || config.AMap.version;
          config.AMap.plugins = plugins || config.AMap.plugins;
          statusMap.AMap = LoadStatus.loading;

          window.__amap_init_callback = function(error?: Error) {
            delete window.__amap_init_callback;

            if (error) {
              statusMap.AMap = LoadStatus.failed;
              reject(error);
            } else {
              statusMap.AMap = LoadStatus.loaded;
              that.appendOther(options)
                .then(() => {
                  resolve(window.AMap);
                })
                .catch(reject);
              while (callbackMap.AMap.length) {
                callbackMap.AMap.splice(0, 1)[0]();
              }
            }
          }

          const scriptSrc = `//${config.hostAndPath}/maps?callback=__amap_init_callback&v=${config.AMap.version}&key=${that.mapKey}&plugin=${config.AMap.plugins.join(',')}`;

          requireScript(scriptSrc, 'amap_api')
            .catch(() => {
              statusMap.AMap = LoadStatus.loaded;
              reject('请求 AMap 失败');
            })
          break;
        case LoadStatus.loaded:
          if (options.key && options.key !== config.key) {
            reject('多个不一致的 key');
            return;
          }
          if (options.version && options.version !== config.AMap.version) {
            reject('不允许多个版本 JSAPI 混用');
            return;
          }
          if (newPlugins.length) {
            window.AMap.plugin(newPlugins, () => {
              this.appendOther(options)
                .then(() => {
                  resolve(window.AMap);
                })
                .catch(reject);
            });
          } else {
            this.appendOther(options)
              .then(() => {
                  resolve(window.AMap);
              })
              .catch(reject);
          }
          break;
        case LoadStatus.loading:
          if (options.key && options.key !== config.key) {
            reject('多个不一致的 key');
            return;
          }
          if (options.version && options.version !== config.AMap.version) {
            reject('不允许多个版本 JSAPI 混用');
            return;
          }
          this.onload(() => {
            if (newPlugins.length) {
              window.AMap.plugin(newPlugins, () => {
                this.appendOther(options)
                  .then(() => {
                    resolve(window.AMap);
                  })
                  .catch(reject);
              });
            } else {
              this.appendOther(options)
                .then(() => {
                  resolve(window.AMap);
                })
                .catch(reject);
            }
          });
      }
    });
  }

  reset() {
    // @ts-ignore
    delete window.AMap;
    delete window.AMapUI;
    delete window.Loca;

    config = JSON.parse(JSON.stringify(defaultConfig));
    statusMap = {
      AMap: LoadStatus.notload,
      AMapUI: LoadStatus.notload,
      Loca: LoadStatus.notload,
    };
    callbackMap = {
      AMap: [],
      AMapUI: [],
      Loca: [],
    };
  }
}

export default APILoader;
