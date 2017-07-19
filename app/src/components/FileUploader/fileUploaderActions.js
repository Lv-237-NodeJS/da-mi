import  { API, request }  from 'src/helper';

const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

export const uploadFile = files => dispatch => 
  request()
    .post(`${API.URL}/api/upload`)
    .attach('fileToUpload', files[0])
    .end((error, res) => {
      !error &&
        dispatch({
          type: UPLOAD_FILE_SUCCESS,
          payload: res.body,
        });
    });
