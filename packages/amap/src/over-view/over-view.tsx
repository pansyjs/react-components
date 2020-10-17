import React, { useImperativeHandle } from 'react';
import { MapChildProps, OffsetType } from '../types/global';
import useOverView from './use-over-view';

export type OverViewOptions = AMap.OverView.Options;

export interface OverViewProps extends
  MapChildProps,
  Omit<OverViewOptions, 'offset'> {
    visiable?: boolean;
    offset?: OffsetType;
  }

type OverViewType = React.ForwardRefRenderFunction<AMap.OverView, OverViewProps>;

const OverView: OverViewType = (props, ref) => {
  const { overView } = useOverView(props);

  useImperativeHandle(
    ref,
    () => (overView as AMap.OverView),
    [overView]
  );

  return null;
};

export default React.forwardRef(OverView);
