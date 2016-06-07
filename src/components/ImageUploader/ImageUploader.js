import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import classes from './ImageUploader.scss'

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
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className={classes["previewText"]}></div>);
    }

    return (
      <div className={classes["previewComponent"]}>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            style={styles.button}
          >
            <input  type="file" style={styles.exampleImageInput} onChange={(e)=>this._handleImageChange(e)} />
          </RaisedButton>
          {/*<button className={classes["submitButton"]} type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>*/}
        </form>
        <div className={classes["imgPreview"]}>
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
export default ImageUploader;