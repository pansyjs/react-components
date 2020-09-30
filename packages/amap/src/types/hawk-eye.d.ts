declare namespace AMap {
  namespace HawkEye {

    interface Options {
      /**
       * 是否随主图视口变化移动
       */
      autoMove?: boolean;
      /**
       * 是否显示视口矩形
       */
      showRectangle?: boolean;
      /**
       * 是否显示打开关闭的按钮
       */
      showButton?: boolean;
      /**
       * 默认是否展开
       */
      isOpen?: boolean;
      /**
       * 缩略图要显示的地图自定义样式，如'amap://styles/dark'
       */
      mapStyle?: string;
      /**
       * 缩略图要显示的图层类型，默认为普通矢量地图
       */
      layers?: array;
      /**
       * 缩略图的宽度，同CSS，如'200px'
       */
      width?: string;
      /**
       * 缩略图的高度，同CSS，如'200px'
       */
      height?: string;
      /**
       * 缩略图距离地图右下角的像素距离，如 [2,2]
       */
      offset?: [number, number];
      /**
       * 缩略图的边框样式，同CSS，如"double solid solid double"
       */
      borderStyle?: string;
    }
  }

  class HawkEye extends Omit<Control, 'addTo' | 'remove'> {
    constructor(opts: HawkEyeOptions);
    /**
     * 恢复鹰眼控件的正常大小
     */
    open(): void;
    /**
     * 最小化鹰眼控件
     */
    close(): void;
  }
}
