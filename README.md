cxj-react-image 用法如下：

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
/>
```

更详细的用法请参考 ``container.js``文件

[github地址](https://github.com/wtfjun/reactImageDemo)

[在线例子](https://wtfjun.github.io/reactImageDemo/build/)

<i>如有帮助，感谢star~~~ 如有问题，欢迎call me~~~</i>

交流请加wx: c13266836563

<hr />
<hr />
<hr />

以下为相关实现讲解

#### 拖拽

实现拖拽的思路是计算出dom最后的left跟top。

未移动前可以通过clientX跟offsetLeft拿到dom的x坐标和左边距，记为``initX和offLeft``。

移动的过程中可以通过``clientX``拿到元素的x坐标，记为``moveX``。

得到公式：``left = moveX - initX + offLeft``。

核心代码如下：
```
const move = (dv) => {
  // 获取元素
  let x = 0;
  let y = 0;
  let l = 0;
  let t = 0;
  let isDown = false;
  // 鼠标按下事件
  dv.onmousedown = function(e) {
    // 获取x坐标和y坐标
    x = e.clientX;
    y = e.clientY;

    // 获取左部和顶部的偏移量
    l = dv.offsetLeft;
    t = dv.offsetTop;
  
    handleMove();
  };
  // 鼠标移动
  // 再包一层是为了方便注册 避免被替换
  function handleMove() {
    onmousemove = function(e) { 
      // 获取x和y
      let nx = e.clientX;
      let ny = e.clientY;

      // 计算移动后的左偏移量和顶部的偏移量
      let nl = nx - (x - l);
      let nt = ny - (y - t);

      dv.style.left = nl + 'px';
      dv.style.top = nt + 'px';
    };
  }
};
```

关于拖拽，有个情况还需要优化：页面上有两个modal，要保证最后点击的modal要覆盖之前点击的modal。

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

思路是使用canvas生成文字图片，然后利用以下的css：

``background-image:url('${base64Url}');``

``background-repeat:repeat;``

实现水印类：
```
/**
 * @overview: 水印组件
 */

export default class WaterMark {
  constructor(container, option) {
    this.container = container;
    this.option = {
      width: '200px',
      height: '150px',
      opacity: .7,
      fillStyle: 'rgba(47, 205, 227, 0.3)',
      font: '20px microsoft yahei',
      textBaseline: 'middle',
      textAlign: 'center',
      fillText: '水印',
      ...option
    };
  }
    
  draw() {
    const { 
      container, 
      option: {
        width,
        height,
        opacity,
        fillStyle,
        font,
        textBaseline,
        textAlign,
        fillText,
        scrollHeight
      } 
    } = this;
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
          background-image:url('${base64Url}')`);
  
    if (typeof container === 'object') {
      container.style.position = 'relative';
      container.insertBefore(watermarkDiv, container.firstChild);
    }
  }
}
```

这里有一篇文章总结了几种前端水印的方案，推荐给大家 [文章](https://juejin.im/post/5b61a273e51d45349e11aba8)

<hr />

#### 缩放

缩放的话，监听鼠标滚动事件。向上滚动放大，向下滚动缩小；这里要注意控制最小缩放值。

还要注意的是图片在边界的缩放，不然图片可能会移动在屏幕外。

需要做的处理是判断左边界跟图片的宽度。

代码实现：
```
// 控制滚轮缩放

const zoom = (onWheelEvent, dom) => {
  let e = onWheelEvent;
  let imageModalWidth = parseInt(dom.style.width);
  let modalLeft = parseInt(dom.style.left);
      
  // 计算缩放后的大小 每一次滚轮 100px
  let calcWidth = imageModalWidth - e.deltaY;                 
      
  // 限制最小 width = 400
  if (calcWidth <= 300) {
    return;
  }
    
  // 不让modal由于缩小消失在视野中
  if (modalLeft + calcWidth < 50) {
    return;
  }
      
  dom.style.width = `${calcWidth}px`;
};
```



