// 拖拽以及控制zIndex

const move = (dv) => {
  let imageModalMaxzIndex = localStorage.getItem('imageModalMaxzIndex');
  if (!imageModalMaxzIndex) {
    localStorage.setItem('imageModalMaxzIndex', 1000);
    dv.style.zIndex = 1000;
  } else {
    dv.style.zIndex = +imageModalMaxzIndex + 1;
    localStorage.setItem('imageModalMaxzIndex', dv.style.zIndex);
  }
  
  // 获取元素
  let x = 0;
  let y = 0;
  let l = 0;
  let t = 0;
  let isDown = false;
  // 鼠标按下事件
  dv.onmousedown = function(e) {
    // console.log('down');
    imageModalMaxzIndex = localStorage.getItem('imageModalMaxzIndex');
    if (dv.style.zIndex != imageModalMaxzIndex) {
      dv.style.zIndex = +imageModalMaxzIndex + 1;
      localStorage.setItem('imageModalMaxzIndex', dv.style.zIndex);
    }
    
    e.preventDefault();
    // 获取x坐标和y坐标
    x = e.clientX;
    y = e.clientY;
  
    // 获取左部和顶部的偏移量
    l = dv.offsetLeft;
    t = dv.offsetTop;
    // 开关打开
    isDown = true;
    // 设置样式  
    dv.style.cursor = 'move';
  };
  // 鼠标移动
  onmousemove = function(e) {
    e.preventDefault();
    if (isDown == false) {
      return;
    }
    // 获取x和y
    let nx = e.clientX;
    let ny = e.clientY;
    // 计算移动后的左偏移量和顶部的偏移量
    let nl = nx - (x - l);
    let nt = ny - (y - t);
  
    dv.style.left = nl + 'px';
    dv.style.top = nt + 'px';

    // 设置移动时透明
    dv.querySelector('.image-content').style.opacity = .3;
  };
  // 鼠标抬起事件
  dv.onmouseup = function() {
    // 开关关闭
    isDown = false;
    dv.style.cursor = 'default';

    // 取消透明
    dv.querySelector('.image-content').style.opacity = 1;
  };
};
  
export default move;
  