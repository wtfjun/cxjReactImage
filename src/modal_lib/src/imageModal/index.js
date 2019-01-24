

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _move = require('./common/move');

var _move2 = _interopRequireDefault(_move);

var _zoom = require('./common/zoom');

var _zoom2 = _interopRequireDefault(_zoom);

var _watermark = require('./common/watermark');

var _watermark2 = _interopRequireDefault(_watermark);

var _rotate = require('./images/rotate.png');

var _rotate2 = _interopRequireDefault(_rotate);

var _close = require('./images/close.png');

var _close2 = _interopRequireDefault(_close);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageModal = function (_Component) {
  _inherits(ImageModal, _Component);

  function ImageModal(props) {
    _classCallCheck(this, ImageModal);

    var _this = _possibleConstructorReturn(this, (ImageModal.__proto__ || Object.getPrototypeOf(ImageModal)).call(this, props));

    _this.handleRotateRight = function () {
      _this.setState({ imgRotate: _this.state.imgRotate + 90 });
    };

    _this.handleRotateLeft = function () {
      _this.setState({ imgRotate: _this.state.imgRotate - 90 });
    };

    _this.state = {
      imgRotate: 0
    };
    return _this;
  }

  _createClass(ImageModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props$option = this.props.option,
          move = _props$option.move,
          waterMarkText = _props$option.waterMarkText;

      var imageModalDom = this.refs.imageModal;
      var imageContentDom = imageModalDom.querySelector('.cxj-image-content');

      // 注册拖拽
      move && (0, _move2.default)(imageModalDom);

      // 画水印 部分图片不画水印，比如聊天图片
      if (waterMarkText) {
        new _watermark2.default(imageContentDom, { fillText: waterMarkText }).draw();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var src = this.props.src;

      if (src !== nextProps.src) {
        this.setState({ imgRotate: 0 });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          src = _props.src,
          prev = _props.prev,
          next = _props.next,
          closeModal = _props.closeModal,
          _props$option2 = _props.option,
          rotate = _props$option2.rotate,
          zoom = _props$option2.zoom;
      var imgRotate = this.state.imgRotate;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          {
            ref: 'imageModal',
            className: 'cxj-image-modal',
            style: { width: '800px' },
            onWheel: function onWheel(e) {
              return zoom && (0, _zoom2.default)(e, _this2.refs.imageModal);
            },
            onContextMenu: function onContextMenu(e) {
              e.preventDefault();
              +e.button === 2 && closeModal();
            }
          },
          rotate && _react2.default.createElement(
            'span',
            { id: 'cxj-rotate-left', onClick: this.handleRotateLeft },
            _react2.default.createElement('img', { src: _rotate2.default, alt: '' })
          ),
          rotate && _react2.default.createElement(
            'span',
            { id: 'cxj-rotate-right', onClick: this.handleRotateRight },
            _react2.default.createElement('img', { src: _rotate2.default, alt: '' })
          ),
          _react2.default.createElement(
            'span',
            { id: 'cxj-close-icon', onClick: closeModal },
            _react2.default.createElement('img', { src: _close2.default, alt: '' })
          ),
          prev && _react2.default.createElement(
            'span',
            { id: 'cxj-left-icon', onClick: prev },
            '<'
          ),
          next && _react2.default.createElement(
            'span',
            { id: 'cxj-right-icon', onClick: next },
            '>'
          ),
          _react2.default.createElement(
            'div',
            { className: 'cxj-image-content', ref: 'imageContent' },
            _react2.default.createElement('img', { src: src, style: { width: '100%', transform: 'rotate(' + imgRotate + 'deg)' }, alt: '' })
          )
        )
      );
    }
  }]);

  return ImageModal;
}(_react.Component);

exports.default = ImageModal;