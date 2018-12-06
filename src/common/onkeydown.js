const onkeydown = () => {
  
  // 全局设置 onkeyup ，避免多次监听 这里想不到更好的方案
  window.onkeyup = e => {
    let imageModalDoms = document.querySelectorAll('.image-modal');
    let imageModalMaxzIndex = localStorage.getItem('imageModalMaxzIndex');
    imageModalDoms.forEach(dom => {
      if (dom.style.zIndex == imageModalMaxzIndex) {
        let leftIconDom = dom.querySelector('#left-icon');
        let rightIconDom = dom.querySelector('#right-icon');
        
        // 键盘左键
        if (leftIconDom && e.keyCode == 37) {
          leftIconDom.click();
        }

        // 键盘右键
        if (rightIconDom && e.keyCode == 39) {
          rightIconDom.click();
        }
      }
    });
  };
};

export default onkeydown;
