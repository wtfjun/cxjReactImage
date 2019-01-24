/**
 * @overview: 水印组件
 */

export default class WaterMark {
  constructor(container, option) {
    this.container = container;
    this.option = {
      width: '200px',
      height: '150px',
      opacity: .7,
      fillStyle: 'rgba(47, 205, 227, 0.3)',
      font: '20px microsoft yahei',
      textBaseline: 'middle',
      textAlign: 'center',
      fillText: '水印',
      ...option
    };
  }
    
  draw() {
    const { 
      container, 
      option: {
        width,
        height,
        opacity,
        fillStyle,
        font,
        textBaseline,
        textAlign,
        fillText,
        scrollHeight
      } 
    } = this;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('opacity', opacity);
    const ctx = canvas.getContext('2d');
  
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * 30);
    ctx.fillText(fillText, 80, 10);
        
    var base64Url = canvas.toDataURL();
    const watermarkDiv = document.createElement('div');
    watermarkDiv.setAttribute('style', `
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:${scrollHeight || '100%'};
          z-index:1000;
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}')`);
  
    if (typeof container === 'object') {
      container.style.position = 'relative';
      container.insertBefore(watermarkDiv, container.firstChild);
    }
  }
}
  