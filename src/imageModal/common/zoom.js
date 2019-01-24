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

export default zoom;
