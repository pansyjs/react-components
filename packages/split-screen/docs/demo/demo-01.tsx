import React, { useState } from 'react';
import { Select, Space } from 'antd';
import SplitScreen from '@pansy/react-split-screen';

const list = [1, 4, 6, 8, 9, 13 , 16];

const options = list.map(item => ({ value: item, label: item }))

export default () => {
  const [current, setCurrent] = useState<number>(4);

  return (
    <Space direction="vertical" style={{ width: '100%'}}>
      <Select
        value={current}
        options={options}
        style={{ width: '100px'}}
        onChange={(value) => { setCurrent(value) }}
      />
      <div style={{ position: 'relative', width: '100%', height: 500 }}>
        <SplitScreen amount={current} />
      </div>
    </Space>
  )
}
