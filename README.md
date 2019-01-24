usege/用法:

```
yarn add cxj-react-image
// npm i cxj-react-image
```

```
import ImageModal from 'cxj-react-image';

<ImageModal 
  src={imageList[currentImageIndex]}  {/* 当前图片路径 */}
  next={() => this.next()}            {/* 控制下一张 */}
  prev={() => this.prev()}            {/* 控制上一张 */}
  closeModal={() => this.closeImg()}  {/* 控制modal打开关闭 */}
  option={{
    move: true,                        {/* 控制拖动 */}
    waterMarkText: '多功能图片组件',    {/* 设置水印文字 */}
    rotate: true,                      {/* 控制旋转 */}
    zoom: true                         {/* 控制放大缩小 */}
  }}
/>}
```

更详细的用法请参考 ``container.js``文件

[github地址](https://github.com/wtfjun/reactImageDemo)

[在线例子](https://wtfjun.github.io/reactImageDemo/build/)

交流请加wx: c13266836563

#### 序：

整理了一下开发的一个React影像组件

由于一些（乱七八糟）的需求，导致之前的组件影像代码冗余，不可维护

看不下去了，是时候出来拯救世界了

于是我上场了

我做的事，就是将各类功能函数抽离，同时代码尽可能的少

这个组件的主要功能有：拖拽、水印、缩放、切换、旋转（更新中）

以及一些小的功能点比如：键盘左右切换、移动时增加透明度等一些细节的优化

不多bb了吧，直接上demo, 自己上来动 

下面我会写一下一些功能的实现

<hr />

#### 拖拽：

鼠标移动的时候改变modal的位置就可以了

并且要设置一下透明度

```
let nx = e.clientX;
    let ny = e.clientY;
    // 计算移动后的左偏移量和顶部的偏移量
    let nl = nx - (x - l);
    let nt = ny - (y - t);
  
    dv.style.left = nl + 'px';
    dv.style.top = nt + 'px';

    // 设置移动时透明
    dv.querySelector('.image-content').style.opacity = .3;
```

关于这个移动，有个地方要注意

比如我们页面上有两个modal，要保证最后点击的modal要覆盖之前点击的modal

也就是zIndex要控制好，这里用localStorage来保存这个最大的zIndex

```
imageModalMaxzIndex = localStorage.getItem('imageModalMaxzIndex');
    if (dv.style.zIndex != imageModalMaxzIndex) {
      dv.style.zIndex = +imageModalMaxzIndex + 1;
      localStorage.setItem('imageModalMaxzIndex', dv.style.zIndex);
    }
```
<hr />

#### 水印

前端实现水印，避免私密图片泄露

其实水印有好几种解决方案 dom、canvas、svg等

这里用canvas实现

思路就是将文本用canvas生成图片，然后将该图片作为背景repeat

```
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('opacity', opacity);
    const ctx = canvas.getContext('2d');
  
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * 30);
    ctx.fillText(fillText, 80, 10);
        
    var base64Url = canvas.toDataURL();
    const watermarkDiv = document.createElement('div');
    watermarkDiv.setAttribute('style', `
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:${scrollHeight || '100%'};
          z-index:1000;
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}')
    `);
```

这里有一篇文章总结了几种前端水印的方案，推荐给大家 [文章](https://juejin.im/post/5b61a273e51d45349e11aba8)

<hr />

#### 缩放

缩放的话，监听鼠标滚动事件

向上滚动放大，向下滚动缩小这样

这里要注意控制最小缩放值，不然会比原子还小，很危险的

还要注意的是图片在边界的缩放，会突然迷失在宇宙中（移除屏幕，这是可能的）

这里要做的处理是判断左边界跟图片的宽度

```
// 不让modal由于缩小消失在视野中
  if (modalLeft + calcWidth < 50) {
    return;
  }
```

<hr />

#### 切换

切换其实就是改变imageModal的src

```
  prev() {
    const { currentImageIndex } = this.state;
    if (currentImageIndex > 0) {
      this.setState({ currentImageIndex: currentImageIndex - 1 });
    }
  }

  next() {
    const { currentImageIndex, imageList } = this.state;
    if (currentImageIndex < imageList.length - 1) {
      this.setState({ currentImageIndex: currentImageIndex + 1 });
    }
  }
```



