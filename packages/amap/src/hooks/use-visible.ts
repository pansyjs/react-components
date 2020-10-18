import { useEffect, useState } from 'react';

function usevisible<T extends { show: () => void; hide: () => void; }>(
  instance: T,
  visible?: boolean)
{
  const [state, setState] = useState(visible);
  useEffect(() => {
    if (instance && visible !== undefined) {
      if (visible) {
        instance.show && instance.show();
      } else {
        instance.hide && instance.hide();
      }
      if(visible !== state) {
        setState(visible);
      }
    }
  }, [instance, visible]);
}

export default usevisible;
