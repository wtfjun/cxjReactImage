import React, { Component } from 'react';
import Move from './common/move';
import Zoom from './common/zoom';
import WaterMark from './common/watermark';

import RotateIcon from './images/rotate.png';
import CloseIcon from './images/close.png';

import './index.css';
class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgRotate: 0
    }
  }

  componentDidMount() {
    const {
      option: {
        move, waterMarkText
      }
    } = this.props;
    let imageModalDom = this.refs.imageModal;
    let imageContentDom = imageModalDom.querySelector('.cxj-image-content');
    
    // 注册拖拽
    move && Move(imageModalDom);

    // 画水印 部分图片不画水印，比如聊天图片
    if (waterMarkText) {
      new WaterMark(imageContentDom, { fillText: waterMarkText }).draw();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      src
    } = this.props;
    if (src !== nextProps.src) {
      this.setState({ imgRotate: 0 });
    }
  }

  handleRotateRight = () => {
    this.setState({ imgRotate: this.state.imgRotate + 90 });
  }

  handleRotateLeft = () => {
    this.setState({ imgRotate: this.state.imgRotate - 90 })
  }

  render() {
    let { src, prev, next, closeModal, option: { rotate, zoom } } = this.props;
    let { imgRotate } = this.state;
    return (
      <div>
        <div 
          ref="imageModal" 
          className="cxj-image-modal" 
          style={{ width: '800px' }}
          onWheel={e => zoom && Zoom(e, this.refs.imageModal)}
          onContextMenu={e => {
            e.preventDefault();
            +e.button === 2 && closeModal();}
          }
        >
          {rotate && <span id="cxj-rotate-left" onClick={this.handleRotateLeft}>
            <img src={RotateIcon} alt="" />
          </span>}
          {rotate && <span id="cxj-rotate-right" onClick={this.handleRotateRight}>
            <img src={RotateIcon} alt="" />
          </span>}
          <span id="cxj-close-icon" onClick={closeModal}>
            <img src={CloseIcon} alt="" />
          </span>
          {prev && <span id="cxj-left-icon" onClick={prev}>&lt;</span>}
          {next && <span id="cxj-right-icon" onClick={next}>&gt;</span>}
          <div className="cxj-image-content" ref="imageContent">
            <img src={src} style={{ width: '100%', transform: `rotate(${imgRotate}deg)` }} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageModal;
