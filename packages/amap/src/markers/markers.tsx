import React, { useImperativeHandle } from 'react';

export interface MarkersProps extends
  AMap.MapChildProps,
  AMap.Rectangle.Options {
    visiable?: boolean;
  }
