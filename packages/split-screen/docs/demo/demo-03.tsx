import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames'
import { Select, Space, Input, Button, message } from 'antd';
import SplitScreen from '@pansy/react-split-screen';
import Player from '@pansy/react-aliplayer';
import type { SplitScreenAmount } from '@pansy/react-split-screen/es/types';
import styles from './demo-03.less';

const list: SplitScreenAmount[] = [1, 4, 6, 8, 9, 13, 16];

const options = list.map(item => ({ value: item, label: item }));

interface PlayerItemProps {
  url?: string;
  active?: boolean;
  onClick?: () => void;
}

const PlayerItem: React.FC<PlayerItemProps> = ({
  url,
  active,
  onClick,
}) => {
  const player = useMemo(
    () => {
      return (
        <Player source={url} isLive options={{ autoplay: true }} />
      )
    },
    [url]
  );

  return (
    <div
      className={classNames(styles.item, {
        [`${styles.itemActive}`]: active
      })}
      onClick={onClick}
    >
      {url && player}
    </div>
  )
}

export default () => {
  const [currentAmount, setCurrentAmount] = useState<SplitScreenAmount>(list[1]);
  const [videos, setVideos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentWindowIndex, setCurrentWindowIndex] = useState<number>(0);

  useEffect(
    () => {
      setVideos(prev => {
        if (prev.length > currentAmount) {
          return prev.splice(0, currentAmount);
        }

        if (prev.length < currentAmount) {
          for (let i = 0; i < currentAmount- prev.length; i++) {
            prev.push('');
          }
        }

        return prev;
      })
    },
    [currentAmount]
  );

  const handleSelect = (index: number) => {
    setCurrentWindowIndex(index);
  }

  const handleAdd = () => {
    if (!inputValue) {
      message.warning('视频地址不能为空');
      return;
    }
    setVideos(prev => {
      const next = [...prev];
      next[currentWindowIndex] = inputValue;
      console.log(next);
      return next;
    });
  }

  return (
    <Space direction="vertical" style={{ width: '100%'}}>
      <div>
        <Select
          value={currentAmount}
          options={options}
          style={{ width: '100px'}}
          onChange={(value) => { setCurrentAmount(value) }}
        />

        <div style={{ float: 'right' }}>
          <Space>
            <Input
              style={{ width: 300 }}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              allowClear
              placeholder="请填写视频地址"
            />
            <Button onClick={handleAdd}>
              加入
            </Button>
          </Space>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 500 }}>
        <SplitScreen<string> amount={currentAmount} list={videos}>
          {(index: number, url) => (
            <PlayerItem
              active={index === currentWindowIndex}
              onClick={() => {
                handleSelect(index);
              }}
              url={url}
            />
          )}
        </SplitScreen>
      </div>
    </Space>
  )
}
