

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @overview: 水印组件
 */

var WaterMark = function () {
  function WaterMark(container, option) {
    _classCallCheck(this, WaterMark);

    this.container = container;
    this.option = _extends({
      width: '200px',
      height: '150px',
      opacity: .7,
      fillStyle: 'rgba(47, 205, 227, 0.3)',
      font: '20px microsoft yahei',
      textBaseline: 'middle',
      textAlign: 'center',
      fillText: '水印'
    }, option);
  }

  _createClass(WaterMark, [{
    key: 'draw',
    value: function draw() {
      var container = this.container,
          _option = this.option,
          width = _option.width,
          height = _option.height,
          opacity = _option.opacity,
          fillStyle = _option.fillStyle,
          font = _option.font,
          textBaseline = _option.textBaseline,
          textAlign = _option.textAlign,
          fillText = _option.fillText,
          scrollHeight = _option.scrollHeight;

      var canvas = document.createElement('canvas');
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      canvas.setAttribute('opacity', opacity);
      var ctx = canvas.getContext('2d');

      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;
      ctx.font = font;
      ctx.fillStyle = fillStyle;
      ctx.rotate(Math.PI / 180 * 30);
      ctx.fillText(fillText, 80, 10);

      var base64Url = canvas.toDataURL();
      var watermarkDiv = document.createElement('div');
      watermarkDiv.setAttribute('style', '\n          position:absolute;\n          top:0;\n          left:0;\n          width:100%;\n          height:' + (scrollHeight || '100%') + ';\n          z-index:1000;\n          pointer-events:none;\n          background-repeat:repeat;\n          background-image:url(\'' + base64Url + '\')');

      if ((typeof container === 'undefined' ? 'undefined' : _typeof(container)) === 'object') {
        container.style.position = 'relative';
        container.insertBefore(watermarkDiv, container.firstChild);
      }
    }
  }]);

  return WaterMark;
}();

exports.default = WaterMark;