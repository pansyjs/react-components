import { useEffect, useState } from 'react';

/**
 * 受控属性
 * @param instance 实例对象
 * @param props 属性值
 * @param properties 多个属性设置的名称
 */
function useSetProperties<T, F = {}>(
  instance = {} as T,
  props = {} as F,
  properties: string[] = []
) {
  properties.forEach((propertie) => {
    // zoom => setZoom
    const setName =`set${propertie.charAt(0).toLowerCase()}${propertie.slice(1)}` as keyof T;

    const [state, setState] = useState(props[propertie]);

      useEffect(() => {
        if (instance && props[propertie] !== undefined) {
          if(props[propertie] !== state && instance[setName] && typeof instance[setName] === 'function') {
            (instance[setName] as any)(props[propertie]);
            setState(props[propertie]);
          }
        }
      }, [instance, props[propertie]]);
  });
}

export default useSetProperties;
