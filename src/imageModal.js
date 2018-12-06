import React, { Component } from 'react';
import move from './common/move';
import zoom from './common/zoom';
import WaterMark from './common/watermark';

class ImageModal extends Component {

  componentDidUpdate = async prevProps => {
    const {
      visible,
      userId,
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
  }

  render() {
    let { visible, src, prev, next, closeModal } = this.props;

    return (
      <div>
        {visible && <div 
          ref="imageModal" 
          className="image-modal" 
          style={{ width: '800px' }}
          onWheel={e => zoom(e, this.refs.imageModal)}
        >
          <span id="close-icon" onClick={closeModal}>x</span>
          <span id="left-icon" onClick={prev}>&lt;</span>
          <span id="right-icon" onClick={next}>&gt;</span>
          <div className="image-content" ref="imageContent">
            <img src={src} style={{ width: '100%' }} alt="" />
          </div>
        </div>}
      </div>
    );
  }
}

export default ImageModal;
