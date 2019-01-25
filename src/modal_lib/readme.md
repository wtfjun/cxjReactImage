usege/用法:

```
yarn add cxj-react-image
// npm i cxj-react-image
```

```
import ImageModal from 'cxj-react-image';

<ImageModal 
  src={imageList[currentImageIndex]}      {/* 当前图片路径 */}
  next={() => this.next()}                {/* 控制下一张 */}
  prev={() => this.prev()}                {/* 控制上一张 */}
  closeModal={() => this.closeImg()}      {/* 控制modal打开关闭 */}
  option={{
    move: true,                           {/* 控制拖动 */}
    waterMarkText: '多功能图片组件',       {/* 设置水印文字 */}
    rotate: true,                         {/* 控制旋转 */}
    zoom: true                            {/* 控制放大缩小 */}
  }}
/>
```

[github地址](https://github.com/wtfjun/cxjReactImage)

[在线例子](https://wtfjun.github.io/cxjReactImage/build/)

交流请加wx: c13266836563

