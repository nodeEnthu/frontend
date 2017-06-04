import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './ImageUploader.scss';
import pica from 'pica/dist/pica';
import shortid from 'shortid';
import {initialImageUrl} from 'utils/constants';
import 'blueimp-canvas-to-blob/js/canvas-to-blob';
import EXIF from 'exif-js';
import PropTypes from 'prop-types';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};


class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imagePreviewUrl: this.props.initialImgUrl,imgUploaded: false};
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.initialImgUrl !== this.props.initialImgUrl){
      this.setState({imagePreviewUrl: nextProps.initialImgUrl});
    }
  }
  _handleImageChange(e) {
    let self = this;
    this.setState({
      imgUploaded:true
    });
    e.preventDefault();
    let reader = new FileReader(),
      file = e.target.files[0],
      fileName = file.name.substr(0, file.name.lastIndexOf('.')),
      fileExtn = file.name.substr(file.name.lastIndexOf('.'), file.name.length),
      randomNumber = shortid.generate(),
      modifiedFileName = fileName+ randomNumber + fileExtn,
      srcCanvas = document.getElementById('imgPreview'),
      ctx = srcCanvas.getContext('2d'),
      destCanvas = document.getElementById("myCanvas");
    reader.onload = function(event){
        let img = new Image();
        img.src = event.target.result;
        img.onload = function(){
            console.log("reaching here 3",img,EXIF);
            EXIF.getData(img,function(){
              console.log("reaching here 4");
              let degree, 
                cw = img.width, ch = img.height, cx = 0, cy = 0;
              switch(EXIF.getTag(this,'Orientation')){  
                case 6:
                  degree = 90;
                  cw = img.height;
                  ch = img.width;
                  cy = img.height * (-1);
                  break;
                case 2:
                  degree = -90;
                  cw = img.height;
                  ch = img.width;
                  cx = img.width * (-1);
                  break;
                case 3:
                  degree =180;
                  cx = img.width * (-1);
                  cy = img.height * (-1);
                  break;
              }
              srcCanvas.setAttribute('width', cw);
              srcCanvas.setAttribute('height', ch);
              ctx.rotate(degree * Math.PI / 180);
              ctx.drawImage(img, cx, cy);
              let aspectRatio = srcCanvas.width/srcCanvas.height;
              let maxiWidthLimit = 500;
              let maxiHeightLimit = 400;
              if(img.width >maxiWidthLimit ){
                destCanvas.width = maxiWidthLimit;
                destCanvas.height = destCanvas.width/aspectRatio
              }else if (img.height > maxiHeightLimit){
                destCanvas.height = maxiHeightLimit;
                destCanvas.width = destCanvas.height * aspectRatio
              } else{
                destCanvas.width   = img.width;
                destCanvas.height  = img.height;
              }
              ctx.drawImage(img,0,0);
              pica.resizeCanvas(srcCanvas,destCanvas,{},function(err){
                destCanvas.toBlob(function(blob){
                  let imageUrl = initialImageUrl + modifiedFileName;
                  self.props.onImageChange(blob,imageUrl,{name:modifiedFileName,type:file.type});
                })
              });
            }) 
          }
     
    }
    reader.readAsDataURL(file);
  }

  render() {
    let {imgUploaded,imagePreviewUrl} = this.state;
    console.log(imgUploaded,imagePreviewUrl)
    let $imagePreview = (imagePreviewUrl)? (<img style={{width:'100%', maxWidth:'250px'}}src={imagePreviewUrl} />) : (<div className="previewText"></div>) ;
    return (
      <div className="previewComponent">
        <div>
          {(!imgUploaded && imagePreviewUrl)? $imagePreview: undefined}
          <canvas id="imgPreview" style={{display:'none'}}></canvas>
          <canvas id="myCanvas" style={{display:(imgUploaded)?'inline-block':'none',maxHeight:"200px",textAlign:"center"}}></canvas>
        </div>

        <div style = {{margin:"0 auto", textAlign:"center"}}>
          <RaisedButton
          label="Choose an Image"
          labelPosition="before"
          style={styles.button}
          disableTouchRipple={true}
          >
          <input name="userfile" style={styles.exampleImageInput} onChange={(e)=>this._handleImageChange(e)} type="file" accept="image/*;capture=camera"/>
          </RaisedButton>
        </div>
      </div>
    )
  }
}

ImageUploader.PropTypes={
  onImageChange: PropTypes.func.isRequired,
}

export default ImageUploader;