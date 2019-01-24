

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 拖拽以及控制zIndex
// dv: 移动的dom
// ctDv: 控制dv的dom
var move = function move(dv, ctDv) {
  // 自己控制自己，且自己移动
  if (!ctDv) {
    ctDv = dv;
  }

  var imageModalMaxzIndex = localStorage.getItem('imageModalMaxzIndex');
  if (!imageModalMaxzIndex) {
    localStorage.setItem('imageModalMaxzIndex', 1000);
    dv.style.zIndex = 1000;
  } else {
    dv.style.zIndex = +imageModalMaxzIndex + 1;
    localStorage.setItem('imageModalMaxzIndex', dv.style.zIndex);
  }

  // 获取元素
  var x = 0;
  var y = 0;
  var l = 0;
  var t = 0;
  var isDown = false;
  var imageContentDom = dv.querySelector('.cxj-image-content');
  // 鼠标按下事件
  ctDv.onmousedown = function (e) {

    imageModalMaxzIndex = localStorage.getItem('imageModalMaxzIndex');
    if (dv.style.zIndex != imageModalMaxzIndex) {
      dv.style.zIndex = +imageModalMaxzIndex + 1;
      localStorage.setItem('imageModalMaxzIndex', dv.style.zIndex);
    }

    // e.preventDefault();
    // 获取x坐标和y坐标
    x = e.clientX;
    y = e.clientY;

    // 获取左部和顶部的偏移量
    l = dv.offsetLeft;
    t = dv.offsetTop;
    // 开关打开
    isDown = true;
    handleMove();
  };
  // 鼠标移动
  // 再包一层是为了方便注册 避免被替换
  function handleMove() {
    onmousemove = function onmousemove(e) {

      if (isDown == false) {
        return;
      } else {
        // 鼠标点击在控制dom ctDv 的时候才取消默认事件、这样html才可复制
        e.preventDefault();
      }

      imageContentDom.style.opacity = .3;
      dv.style.border = '2px dashed #999';
      // 获取x和y
      var nx = e.clientX;
      var ny = e.clientY;
      // 计算移动后的左偏移量和顶部的偏移量
      var nl = nx - (x - l);
      var nt = ny - (y - t);

      dv.style.left = nl + 'px';
      dv.style.top = nt + 'px';
    };
  }
  // 鼠标抬起事件
  dv.onmouseup = function () {
    // 开关关闭
    isDown = false;
    // 取消透明
    imageContentDom.style.opacity = 1;
    dv.style.border = '2px solid transparent';
  };
};

exports.default = move;