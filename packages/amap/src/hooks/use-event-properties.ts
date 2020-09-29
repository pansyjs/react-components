import { useEffect } from 'react';

export interface MapEventListener {
  /**
   * 添加事件监听函数
   * @param event
   * @param handler
   */
  on(event: string, handler: any): void;
  /**
   * 移除事件监听函数
   * @param event
   * @param handler
   */
  off(event: string, handler: any): void;
}

/**
 * 绑定事件
 * @param instance 实例对象
 * @param props props
 * @param eventNames 事件的名字
 */
function useEventProperties<T extends MapEventListener, F>(
  instance: T,
  props = {} as F,
  eventName: string[] = []
) {
  eventName.forEach((name) => {
    const eventName = name as keyof F;
    const eventHandle = props[eventName];
    useEffect(() => {
      if(!instance) return;
      let eName = name.toLocaleLowerCase().replace(/^on/, '');
      if (eventHandle && eName) {
        instance.on(eName, eventHandle);
      }
      return () => {
        if (eName && eventHandle) {
          instance.off(eName, eventHandle);
        }
      }
    }, [instance, props[eventName]]);
  });
}

export default useEventProperties;
