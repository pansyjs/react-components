import { useEffect, useState } from 'react';

/**
 * 对实例状态的处理
 * @param instance 实例对象
 * @param props 设置的参数
 * @param status 状态的枚举
 */
function useSetStatus<S, T extends { getStatus: () => S; setStatus: (opt: Partial<S>) => void; }, F = {}>(
  instance: T,
  props = {} as F,
  status: string[] = []
) {
  status.forEach((name) => {
    if (name in props) {
      const [state, setState] = useState<boolean>(props[name]);

      useEffect(() => {
        if (instance && props[name] !== undefined) {
          if (props[name] !== state) {
            const status = instance.getStatus();
            instance.setStatus({ ...status, [name]: props[name] });
            setState(props[name]);
          }
        }
      }, [instance, props[name]]);
    }
  });
}

export default useSetStatus;
