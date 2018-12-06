const rotate = (imageContent, image) => {
  let canvas = document.createElement('canvas');
  // canvas.width = image.width;
  // canvas.height = image.height;
  // console.log(image.height, image.width);
  let ctx = canvas.getContext('2d');
  ctx.rotate(90 * Math.PI / 180);        // 正方向旋转90度
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);


  let newImage = new Image();
  newImage.src = canvas.toDataURL('image/png');
  imageContent.replaceChild(newImage, image);
};

export default rotate;