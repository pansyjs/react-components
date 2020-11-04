import React, { useState } from 'react';
import { Button } from 'antd';
import Watermark from '@pansy/react-watermark';

export default () => {
  const [status, setStatus] = useState<boolean>(false);

  return (
    <div>
      <Button
        onClick={() => { setStatus(!status) }}
      >
        {status ? '销毁' : '创建'}
      </Button>
      {status && (<Watermark  isBody text={['张某某', '12345678910122']} />)}
    </div>
  )
}
