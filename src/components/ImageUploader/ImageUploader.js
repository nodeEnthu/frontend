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
    let file = e.target.files[0];
    let fileName = file.name;

    // postCall('/api/upload/sign',{'file-name':fileName,'file-type':file.type})
    //   .then(function(res){
    //     putImgCall(res,file)
    //     .then(function(res){
    //     })
    //   })
    
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

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
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
export default ImageUploader;