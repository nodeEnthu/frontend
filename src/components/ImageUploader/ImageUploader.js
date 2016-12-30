import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './ImageUploader.scss';
import pica from 'pica/dist/pica';
import shortid from 'shortid';
import {initialImageUrl} from 'utils/constants';
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
    this.state = {file: '',imagePreviewUrl: this.props.initialImgUrl,imgUploaded: false};
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
    let reader = new FileReader();
    let file = e.target.files[0];
    let fileName = file.name.substr(0, file.name.lastIndexOf('.'));
    let fileExtn = file.name.substr(file.name.lastIndexOf('.'), file.name.length);
    let randomNumber = shortid.generate();
    let modifiedFileName = fileName+ randomNumber + fileExtn;
    let srcCanvas = document.getElementById('imgPreview');
    let ctx = srcCanvas.getContext('2d');
    let destCanvas = document.getElementById("myCanvas");
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            srcCanvas.width   = img.width;
            srcCanvas.height  = img.height;
            let aspectRatio = img.width/img.height;
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
              let dataURL = destCanvas.toDataURL("image/png");
              let binary = atob(dataURL.split(',')[1]);
              let array = [];
              for(let i = 0; i < binary.length; i++) {
                  array.push(binary.charCodeAt(i));
              }
              let s3Data= new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
              let imageUrl = initialImageUrl + modifiedFileName;
              // this should happen pretty fast ... hoping the user does not click submit
              self.props.onImageChange(s3Data,imageUrl,{name:modifiedFileName,type:file.type});
          });
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
  }

  render() {
    let {imgUploaded,imagePreviewUrl} = this.state;
    let $imagePreview = (imagePreviewUrl)? (<img style={{width:'100%'}}src={imagePreviewUrl} />) : (<div className="previewText"></div>) ;
    return (
      <div className="previewComponent">
        <div style={{display:'flex', maxWidth:'400px',height:'auto', margin:'0 auto'}}>
          {(!imgUploaded && imagePreviewUrl)? $imagePreview: undefined}
          <canvas id="imgPreview" style={{display:'none',width:'400px',height:'auto'}}></canvas>
          <canvas id="myCanvas" style={{display:(imgUploaded)?'inline-block':'none',flex: '1 1 0', minWidth:0}}></canvas>
        </div>
        <div style = {{margin:"0 auto", textAlign:"center"}}>
          <RaisedButton
          label="Choose an Image"
          labelPosition="before"
          style={styles.button}
          disableTouchRipple={true}
          >
          <input  type="file" style={styles.exampleImageInput} onChange={(e)=>this._handleImageChange(e)} />
          </RaisedButton>
        </div>
        

        
      </div>
    )
  }
}

React.propTypes={
  onImageChange: React.PropTypes.func.isRequired,
}

export default ImageUploader;