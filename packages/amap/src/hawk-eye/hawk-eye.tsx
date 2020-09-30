/// <reference types="../types/hawk-eye" />

import React, { useImperativeHandle } from 'react';
import { MapChildProps } from '../types/global';
import useHawkEye from './use-hawk-eye';

export interface HawkEyeProps extends MapChildProps, AMap.HawkEye.Options {
  visiable?: boolean;
}

type HawkEyeType = React.ForwardRefRenderFunction<{ hawkEye?: AMap.HawkEye }, HawkEyeProps>;

export const HawkEye: HawkEyeType = (props, ref) => {
  const { hawkEye } = useHawkEye(props);
  useImperativeHandle(ref, () => ({ hawkEye }), [hawkEye]);
  return null;
};

export default React.forwardRef(HawkEye);
