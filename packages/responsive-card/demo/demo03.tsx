import React from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { ResponsiveCard } from '@pansy/react-responsive-card';

export default () => {
  return (
    <CheckCard.Group defaultValue="option1" style={{ width: '100%' }}>
      <ResponsiveCard gutter={[24, 32]}>
        <CheckCard
          title="Card title"
          description="This is the description"
          value="option1"
          avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
        />
        <CheckCard
          title="Card title"
          description="This is the description"
          value="option2"
          avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
        />
        <CheckCard
          title="Card title"
          description="This is the description"
          value="option3"
          avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
        />
      </ResponsiveCard>
    </CheckCard.Group>
  );
};
