import React from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { ResponsiveCard } from '@pansy/react-responsive-card';

const options = [
  { title: '🍊 Orange', description: '🍊 Orange', value: 'option1' },
  { title: '🍐 Pear', description: '🍐 Pear', value: 'option2' },
  { title: '🍎 Apple', description: '🍎 Apple', value: 'option3' },
  { title: '🍎 Apple1', description: '🍎 Apple1', value: 'option4' },
]

export default () => {
  return (
    <CheckCard.Group defaultValue="A" style={{ width: '100%' }}>
      <ResponsiveCard>
        {(config) => {
          return options.map((item, index) => {
            const style = {
              width: config.width,
              marginRight:
                (index + 1) % config.span != 0
                  ? config.gutter
                  : 0,
            }

            return (
              <CheckCard
                {...item}
                style={style}
                key={index}
            />
            )
          })
        }}
      </ResponsiveCard>
    </CheckCard.Group>
  );
};
