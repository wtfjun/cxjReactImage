

Object.defineProperty(exports, "__esModule", {
  value: true
});
var onkeydown = function onkeydown() {

  // 全局设置 onkeyup ，避免多次监听 这里想不到更好的方案
  window.onkeyup = function (e) {
    var imageModalDoms = document.querySelectorAll('.image-modal');
    var imageModalMaxzIndex = localStorage.getItem('imageModalMaxzIndex');
    imageModalDoms.forEach(function (dom) {
      if (dom.style.zIndex == imageModalMaxzIndex) {
        var leftIconDom = dom.querySelector('#left-icon');
        var rightIconDom = dom.querySelector('#right-icon');

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

exports.default = onkeydown;