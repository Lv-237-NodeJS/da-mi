const React = require('react');
const Dropzone = require('react-dropzone');
import  { API, request }  from 'src/helper';

class FileUploader extends React.Component{
  onDrop = 
  (files, signedRequest, url) => {    
    request()
      .post(`${API.URL}/api/upload`)
      .attach('fileToUpload', files[0])
      .end((err, res) =>  
        err && (err) ||
        res.send('File uploaded!')) ;
  }
  
  render(){
    return (
      <div>
        <Dropzone onDrop={this.onDrop} multiple={false}>
          <div>Try dropping a file here, or click to select a file to upload.</div>
        </Dropzone>
      </div>
    );
  }
}

export default FileUploader;
