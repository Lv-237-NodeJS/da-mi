const React = require('react');
const Dropzone = require('react-dropzone');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as fileUploaderActions from './fileUploaderActions';
import './fileUploader.scss';

class FileUploader extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: ''
    };
  }
  
  onDrop = (files) => {
    this.props.actions.uploadFile(files);
    this.setState({
      fileUrl: this.props.fileName
    });
  }
  
  render() {
    return (
      <div>
        <Dropzone className='file-uploader' onDrop={this.onDrop} multiple={false}>
          <div>Try dropping a file here, or click to select a file to upload.</div>
        </Dropzone>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fileUrl: state.fileUrl
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(fileUploaderActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
