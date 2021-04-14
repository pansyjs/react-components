import React, { useState } from 'react';
import { Select, Space } from 'antd';
import SplitScreen from '@pansy/react-split-screen';
import type { SplitScreenAmount } from '@pansy/react-split-screen/es/types';
import Player from '@pansy/react-aliplayer';

const list: SplitScreenAmount[] = [1, 4, 6, 8, 9, 13, 16];

const options = list.map(item => ({ value: item, label: item }))

export default () => {
  const [current, setCurrent] = useState<SplitScreenAmount>(4);

  return (
    <Space direction="vertical" style={{ width: '100%'}}>
      <Select
        value={current}
        options={options}
        style={{ width: '100px'}}
        onChange={(value) => { setCurrent(value) }}
      />
      <div style={{ position: 'relative', width: '100%', height: 500 }}>
        <SplitScreen amount={current}>
          {(index: number) => {
            return (
              <Player
                source="//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4"
                options={{
                  autoplay: true,
                  rePlay: true,
                }}
              />
            )
          }}
        </SplitScreen>
      </div>
    </Space>
  )
}
