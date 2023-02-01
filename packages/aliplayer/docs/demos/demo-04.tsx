import React, { useRef } from 'react';
import { Button, Space } from 'antd'
import { Player } from '@pansy/react-aliplayer';

import type { PlayerRef } from '@pansy/react-aliplayer';

export default () => {
  const playerRef = useRef<PlayerRef>(null);

  const handlePlay = () => {
    if (!playerRef.current) return;
    const player = playerRef.current.getInstance();
    player && player.play()
  }

  const handlePause = () => {
    if (!playerRef.current) return;
    const player = playerRef.current.getInstance();
    player && player.pause()
  }

  const handleReplay = () => {
    if (!playerRef.current) return;
    const player = playerRef.current.getInstance();
    player && player.replay()
  }

  const handleSeek = () => {
    if (!playerRef.current) return;
    const player = playerRef.current.getInstance();
    player && player.seek(10)
  }

  const handleLoadByUrl = () => {
    if (!playerRef.current) return;
    const player = playerRef.current.getInstance();
    player && player.loadByUrl('//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4')
  }

  return (
    <>
      <Player
        source="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
        hideControlbar
        style={{ height: 500 }}
        ref={playerRef}
      />

      <br />

      <Space>
        <Button onClick={handlePlay}>播放</Button>
        <Button onClick={handlePause}>暂停</Button>
        <Button onClick={handleReplay}>重播</Button>
        <Button onClick={handleSeek}>跳转到10S</Button>
        <Button onClick={handleLoadByUrl}>切换视频</Button>
      </Space>
    </>
  );
};
