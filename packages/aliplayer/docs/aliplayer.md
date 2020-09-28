---
title: AliPlayer 阿里播放器
nav:
  title: 组件
  path: /components
order: 10
group:
  path: /
---

# AliPlayer 阿里播放器

## 何时使用

- 播放视频。
- 播放直播流(flv、hls)。

## 代码示例

### 简单使用

<code src="../demos/demo-01.tsx" />

### 隐藏控制栏

<code src="../demos/demo-02.tsx" />

### 直播

<code src="../demos/demo-03.tsx" />

### 手动控制

<code src="../demos/demo-04.tsx" />

## API

| 参数      | 说明               | 类型    | 默认值             |
| --------- | ------------------ | ------- | ------------------ |
| className     | 额外的样式类     | string | --              |
| style     | 额外的样式     | CSSProperties | --              |
| source     | 播放源     | string | --              |
| isLive | 是否是直播 | boolean | `false` |
| options | 配置参数 | object | {} |
| version | 阿里播放器版本 | string | 2.8.2 |
|changeSourceMode|修改播放源处理模式 loadByUrl(加载播放源)、init(销毁重新创建实例) |`loadByUrl` \| `init`| `init` |
| hideControlbar | 是否隐藏控制栏 | boolean | false |
| cssLinkTemplate | 阿里播放器CSS模板 | string | //g.alicdn.com/de/prismplayer/{%version}/skins/default/aliplayer-min.css |
| scriptSrcTemplate | 阿里播放器JS模板 | string | //g.alicdn.com/de/prismplayer/{%version}/aliplayer-min.js |
| loading     | 用于在播放器加载成功前渲染     | ReactNode | -- |
| onReady     | 播放器视频初始化按钮渲染完毕     | Function | -- |
| onPlay     | 视频暂停时触发     | Function | -- |
| onPause     | 播放器视频初始化按钮渲染完毕     | Function | -- |
| onCanplay     | 能够开始播放音频/视频时发生，会多次触发，仅H5播放器     | Function | -- |
| onPlaying     | 播放中，会触发多次     | Function | -- |
| onLiveStreamStop     | 直播流中断时触发     | Function | -- |
| onM3u8Retry     | m3u8直播流中断后重试事件     | Function | -- |
| onHideBar     | 控制栏自动隐藏事件     | Function | -- |
| onShowBar     | 控制栏自动显示事件     | Function | -- |
| onWaiting     | 数据缓冲事件     | Function | -- |
| onSnapshoted     | 截图完成事件     | Function | -- |
| onRequestFullScreen     | 全屏事件，仅H5支持     | Function | -- |
| onCancelFullScreen     | 取消全屏事件，iOS下不会触发，仅H5支持     | Function | -- |
| onError     | 错误事件     | Function | -- |

**注意**

cssLinkTemplate、scriptSrcTemplate 中的 `{%version}` 会使用version进行替换

## options

| 参数      | 说明               | 类型    | 默认值             |
| --------- | ------------------ | ------- | ------------------ |
| vid     | 媒体转码服务的媒体Id     | string | --              |
| playauth     | 播放权证     | string | --              |
| height     | 播放器高度     | string | `100%`      |
| width     | 播放器宽度     | string | `100%`    |
| videoWidth     | 视频宽度，仅h5支持     | string | --      |
| videoHeight     | 视频高度，仅h5支持     | string | --    |
| preload     | 播放器自动加载，目前仅h5可用     | boolean | --    |
| cover     | 播放器默认封面图片     | string | --    |
| autoplay     | 播放器是否自动播放     | boolean | --    |
| rePlay     | 播放器自动循环播放     | boolean | --    |
| useH5Prism     | 指定使用H5播放器     | boolean | -- |
| useFlashPrism | 指定使用Flash播放器 | boolean | -- |
| playsinline | H5是否内置播放，有的Android浏览器不起作用 | boolean | -- |
| showBuffer | 显示播放时缓冲图标 | boolean | -- |
| skinRes | 皮肤图片，不建议随意修改该字段，如要修改，请参照皮肤定制 | any | -- |
| skinLayout | 功能组件布局配置，不传该字段使用默认布局。传false隐藏所有功能组件，请参照皮肤定制 | any | -- |
| controlBarVisibility | 控制面板的实现 | 'click' \| 'hover' \| 'always' | -- |
| showBarTime | 控制栏自动隐藏时间 | number | -- |
| extraInfo | JSON串用于定制性接口参数 | string | -- |
| enableSystemMenu | 是否允许系统右键菜单显示 | boolean | -- |
| format | 指定播放地址格式，只有使用vid的播放方式时支持 | 'mp4'\| 'm3u8' \| 'flv' \| 'mp3' | -- |
| mediaType | 指定返回音频还是视频，只有使用vid的播放方式时支持 | 'video' \| 'audio' | -- |
| qualitySort | 指定排序方式，只有使用vid + plauth播放方式时支持 | 'desc' \| 'asc' | -- |
| definition | 显示视频清晰度，多个用逗号分隔 | string | -- |
| defaultDefinition | 默认视频清晰度 |'FD' \| 'LD' \| 'SD' \| 'HD' \| 'OD' \| '2K' \| '4K' | -- |
| x5_type | 声明启用同层H5播放器，启用时设置的值为‘h5’ | string | `auto` |
| x5_fullscreen | 声明视频播放时是否进入到TBS的全屏模式 | boolean | false |
| x5_video_position | 声明视频播在界面上的位置 | 'top' \| 'center' | `center` |
| x5_orientation | 声明视频播放时是否进入到TBS的全屏模式 | 'landscape' \| 'landscape' | -- |
| x5LandscapeAsFullScreen | 声明TBS全屏播放是否横屏 | boolean | -- |
| autoPlayDelay | 延迟播放时间，单位为秒 | number | -- |
| autoPlayDelayDisplayText | 延迟播放提示文本 | string | -- |
| language | 指定语言 | string | -- |
| languageTexts | 国际化 | string | -- |
| snapshot | flash启用截图功能 | boolean | -- |
| snapshotWatermark | H5设置截图水印 | object | -- |
| useHlsPluginForSafari | Safari浏览器可以启用Hls插件播放，Safari 11除外。 | boolean | -- |
| enableStashBufferForFlv | H5播放flv时，设置是否启用播放缓存，只在直播下起作用 | boolean | -- |
| stashInitialSizeForFlv | H5播放flv时，初始缓存大小，只在直播下起作用 | number | -- |
| loadDataTimeout | 缓冲多长时间后，提示用户切换低清晰度 | number | 20 |
| waitingTimeout | 大缓冲超时时间 | number | 60 |
| liveStartTime | 直播开始时间，直播时移功能使用，格式为：“2018/01/04 12:00:00” | string | -- |
| liveOverTime | 直播结束时间，直播时移功能使用，格式为：“2018/01/04 12:00:00” | string | -- |
| liveTimeShiftUrl | 直播可用时移查询地址 | string | -- |
| liveShiftSource | flv直播地址播放时，hls的流地址 | string | -- |
| recreatePlayer | flv直播和hls时移切换是，重新创建播放器方法 | function | -- |
| diagnosisButtonVisible | 是否显示检测按钮 | boolean | true |
| disableSeek | 禁用进度条的Seek，默认为false，仅Flash支持 | boolean | false |
| encryptType | 加密类型 | 0 /| 1 | 0 |
| progressMarkers | 进度条打点内容数组 | object[] | -- |
| vodRetry | 点播失败重试次数 | number | 3 |
| liveRetry | 直播播放失败重试次数 | number | 5 |

## 错误代码

|代码|含义|
|--|--|
|4001|参数不合理|
|4002|鉴权过期|
|4003|无效地址|
|4004|地址不存在|
|4005|开始下载数据错误，检测网络情况或播放地址是否可以访问。|
|4006|开始下载元数据数据错误|
|4007|播放时错误|
|4008|加载超时，检测网络情况或播放地址是否可以访问|
|4009|请求数据错误，测网络情况或播放地址是否可以访问|
|4010|不支持加密视频播放|
|4011|播放格式不支持|
|4012|playauth解析错误|
|4013|播放数据解码错误MEDIA_ERR_DECODE，检测浏览器是否支持视频格式。|
|4014|网络不可用|
|4015|获取数据过程被中止MEDIA_ERR_ABORTED|
|4016|播网络错误加载数据失败MEDIA_ERR_NETWORK|
|4017|返回的播放地址为空|
|4400|未知错误MEDIA_ERR_SRC_NOT_SUPPORTED(由于服务器或网络原因不能加载资源，或者格式不支持)|
|4500|服务端请求错误，查看Network里点播服务的请求的具体错误|
