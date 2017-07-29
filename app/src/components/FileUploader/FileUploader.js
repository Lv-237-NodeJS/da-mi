import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as fileUploaderActions from './fileUploaderActions';
import './fileUploader.scss';

class FileUploader extends React.Component{
  onDrop = files => {
    this.props.actions.uploadFile(files);
  };

  render() {
    return (
      <div>
        <Dropzone className='file-uploader' onDrop={this.onDrop} multiple={false}>
          <div>Try dropping a file here, or click to select a file to upload. Up to 2MB only.</div>
        </Dropzone>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fileUrl: state.fileUploader.fileUrl
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(fileUploaderActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
