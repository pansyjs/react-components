import React, { useImperativeHandle } from 'react';
import useAutoComplete from './use-auto-complete';

export interface AutoCompleteProps extends
  AMap.MapChildProps,
  Partial<AMap.AutoCompleteEventMap>,
  AMap.Autocomplete.Options {
    visiable?: boolean;
  }

type AutoCompleteType = React.ForwardRefRenderFunction<{ autoComplete?: AMap.Autocomplete}, AutoCompleteProps>;

export const AutoComplete: AutoCompleteType = (props, ref) => {
  const { autoComplete } = useAutoComplete(props);

  useImperativeHandle(ref, () => ({ autoComplete }));
  return null;
};

export default React.forwardRef(AutoComplete);
