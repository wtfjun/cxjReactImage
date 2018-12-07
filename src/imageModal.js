import React, { Component } from 'react';
import move from './common/move';
import zoom from './common/zoom';
import WaterMark from './common/watermark';
class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgRotate: 0
    }
  }

  componentDidUpdate = async prevProps => {
    const {
      visible,
      userId,
      src
    } = this.props;
    if (visible && !prevProps.visible) {
      let imageModalDom = this.refs.imageModal;
      let imageContentDom = imageModalDom.querySelector('.image-content');
      
      // 注册拖拽
      move(imageModalDom);

      // 画水印 部分图片不画水印，比如聊天图片
      if (userId) {
        new WaterMark(imageContentDom, { fillText: userId }).draw();
      }
    }

    if (src !== prevProps.src) {
      this.setState({ imgRotate: 0 })
    }
  }

  handleRotateRight = () => {
    this.setState({ imgRotate: this.state.imgRotate + 90 });
  }

  handleRotateLeft = () => {
    this.setState({ imgRotate: this.state.imgRotate - 90 })
  }

  render() {
    let { visible, src, prev, next, closeModal } = this.props;
    let { imgRotate } = this.state;
    return (
      <div>
        {visible && <div 
          ref="imageModal" 
          className="image-modal" 
          style={{ width: '800px' }}
          onWheel={e => zoom(e, this.refs.imageModal)}
          onContextMenu={e => {
            e.preventDefault();
            +e.button === 2 && closeModal();}
          }
        >
          <span id="rotate-left" onClick={this.handleRotateLeft}>
            <img src="https://upload-images.jianshu.io/upload_images/5691297-f01bb4b7b31b7a5f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/512/format/webp" alt="" />
          </span>
          <span id="rotate-right" onClick={this.handleRotateRight}>
            <img src="https://upload-images.jianshu.io/upload_images/5691297-f01bb4b7b31b7a5f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/512/format/webp" alt="" />
          </span>
          <span id="close-icon" onClick={closeModal}>
            <img src="https://upload-images.jianshu.io/upload_images/5691297-79565d2f23ae3b18.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/32/format/webp" alt="" />
          </span>
          <span id="left-icon" onClick={prev}>&lt;</span>
          <span id="right-icon" onClick={next}>&gt;</span>
          <div className="image-content" ref="imageContent">
            <img src={src} style={{ width: '100%', transform: `rotate(${imgRotate}deg)` }} alt="" />
          </div>
        </div>}
      </div>
    );
  }
}

export default ImageModal;
