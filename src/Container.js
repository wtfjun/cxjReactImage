import React, { Component } from 'react';
import ImageModal from './imageModal';
import './index.css';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      currentImageIndex: 0,
      modalVisible: false,
    };
  }

  componentDidMount() {
    // 可以在这里异步获取图片数组
    this.setState({
      imageList: [
        'http://pic39.photophoto.cn/20160630/1155115644653376_b.jpg',
        'http://image.biaobaiju.com/uploads/20180801/23/1533136618-ARPmGQwjvD.jpg',
        'http://img18.3lian.com/d/file/201712/08/8c2b94d5ec0bf634e3881b4ad5568b57.png',
        'http://img3.duitang.com/uploads/blog/201509/15/20150915125228_ixEts.jpeg',
        'https://s10.sinaimg.cn/mw690/001whaJHzy7kChbjZRn59&690',
        'https://upload-images.jianshu.io/upload_images/5691297-648aed056c02698f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/542/format/webp'
      ]
    })
  }

  prev() {
    const { currentImageIndex } = this.state;
    if (currentImageIndex > 0) {
      this.setState({ currentImageIndex: currentImageIndex - 1 });
    }
  }

  next() {
    const { currentImageIndex, imageList } = this.state;
    if (currentImageIndex < imageList.length - 1) {
      this.setState({ currentImageIndex: currentImageIndex + 1 });
    }
  }

  handleImgClick = index => {
    this.setState({ 
      modalVisible: true,
      currentImageIndex: index
    });

  }

  closeImg = () => this.setState({ modalVisible: false });

  render() {
    const { modalVisible, imageList, currentImageIndex } = this.state;
    return (
      <div className="container">
        <ul className="image-list">
          {imageList.map((src, i) => <li>
            <img 
              key={i}
              src={src}
              style={{ width: '100px' }}
              alt="" 
              onClick={ () => this.handleImgClick(i) } 
            />
          </li>)}
          
        </ul>

        <ImageModal 
          visible={modalVisible}
          src={imageList[currentImageIndex]}
          next={() => this.next()}
          prev={() => this.prev()}
          closeModal={() => this.closeImg()}
          userId="多功能图片组件"
        />
      </div>
    );
  }
}

export default Container;
