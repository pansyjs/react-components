import React, { useEffect, useRef } from 'react';
import Watermark, { WatermarkOptions } from '@pansy/watermark';

export interface WatermarkComponentProps extends Partial<WatermarkOptions> {
  isBody?: Boolean;
}

const WatermarkComponent: React.FC<WatermarkComponentProps> = (params) => {
  const { isBody, ...rest } = params;
  const root = useRef<HTMLDivElement>(null);
  const watermark = useRef<Watermark>();

  useEffect(() => {
    if (!watermark.current) {
      watermark.current = new Watermark();
    }
    watermark.current.update({
      ...rest,
      container: !isBody ? root.current as HTMLDivElement : undefined
    });
    watermark.current.render();

    return () => {
      watermark.current?.destroy();
    }
  }, [params]);

  return (
    <div ref={root} />
  )
}

WatermarkComponent.defaultProps = {
  isBody: false,
  monitor: true,
  width: 320,
  height: 160,
  mode: 'interval'
}

export default WatermarkComponent;
