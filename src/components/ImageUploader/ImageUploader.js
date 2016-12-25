import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {postCall,putImgCall} from 'utils/httpUtils/apiCallWrapper'
import './ImageUploader.scss';
import pica from 'pica/dist/pica';

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
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    //console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    let self = this;
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let srcCanvas = document.getElementById('imgPreview');
    let ctx = srcCanvas.getContext('2d');
    let destCanvas = document.getElementById("myCanvas");
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            srcCanvas.width = img.width;
            srcCanvas.height = img.height;
            ctx.drawImage(img,0,0);
            pica.resizeCanvas(srcCanvas,destCanvas,{},function(err){
              let dataURL = destCanvas.toDataURL("image/png");
              let binary = atob(dataURL.split(',')[1]);
              let array = [];
              for(let i = 0; i < binary.length; i++) {
                  array.push(binary.charCodeAt(i));
              }
              let s3Data= new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
              console.log(s3Data);
              postCall('/api/upload/sign',{'file-name':file.name,'file-type':file.type})
                .then(function(response){
                  putImgCall(response.data.signedRequest,s3Data)
                  .then(function(res){
                    console.log(response.data.url);
                  })
                })
            
          });
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);

    
 
    
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = (imagePreviewUrl)? (<img src={imagePreviewUrl} />) : (<div className="previewText"></div>) ;
    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            style={styles.button}
            disableTouchRipple={true}
          >
            <input  type="file" style={styles.exampleImageInput} onChange={(e)=>this._handleImageChange(e)} />
          </RaisedButton>
          {/*<button className={classes["submitButton"]} type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>*/}
        </form>
        <canvas style={{display:'none'}}id="imgPreview">
        </canvas>
        <canvas id="myCanvas"></canvas>
      </div>
    )
  }
}
  
export default ImageUploader;