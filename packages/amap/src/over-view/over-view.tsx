/// <reference types="../types" />

import React, { useImperativeHandle } from 'react';
import useOverView from './use-over-view';

export type OverViewOptions = AMap.OverView.Options;

export interface OverViewProps extends
  AMap.MapChildProps,
  Omit<OverViewOptions, 'offset'> {
    visible?: boolean;
    offset?: AMap.OffsetType;
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
