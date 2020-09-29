import { useEffect, useState } from 'react';

function useVisiable<T extends { show: () => void; hide: () => void; }>(
  instance: T,
  visiable?: boolean)
{
  const [state, setState] = useState(visiable);
  useEffect(() => {
    if (instance && visiable !== undefined) {
      if (visiable) {
        instance.show && instance.show();
      } else {
        instance.hide && instance.hide();
      }
      if(visiable !== state) {
        setState(visiable);
      }
    }
  }, [instance, visiable]);
}

export default useVisiable;
