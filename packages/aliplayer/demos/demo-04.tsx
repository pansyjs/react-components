import React, { FC, useRef } from 'react';
// @ts-ignore
import Player from '@pansy/react-aliplayer';

const Example: FC = () => {
  const playerRef = useRef(null);

  const handlePlay = () => {
    const player = playerRef.current;
    player && player.play()
  }

  const handlePause = () => {
    const player = playerRef.current;
    player && player.pause()
  }

  const handleReplay = () => {
    const player = playerRef.current;
    player && player.replay()
  }

  const handleSeek = () => {
    const player = playerRef.current;
    player && player.seek(2)
  }

  const handleLoadByUrl = () => {
    const player = playerRef.current;
    player && player.loadByUrl('//stream7.iqilu.com/10339/upload_transcode/202002/18/202002181038474liyNnnSzz.mp4')
  }

  return (
    <div>
      <Player
        source="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
        hideControlbar
        style={{ height: 500 }}
        ref={playerRef}
      />

      <div style={{ padding: '16px 0' }}>
        <button onClick={handlePlay}>播放</button>
        <button style={{ marginLeft: 8 }} onClick={handlePause}>暂停</button>
        <button style={{ marginLeft: 8 }} onClick={handleReplay}>重播</button>
        <button style={{ marginLeft: 8 }} onClick={handleSeek}>跳转到2S</button>
        <button style={{ marginLeft: 8 }} onClick={handleLoadByUrl}>切换视频</button>
      </div>
    </div>
  );
};

export default Example;
