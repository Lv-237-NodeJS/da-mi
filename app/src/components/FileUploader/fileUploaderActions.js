import  { API, request }  from 'src/helper';

const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';
const RESET_IMAGE = 'RESET_IMAGE';

const uploadFileSuccess = res => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: res.body.url
});

export const resetImage = () => ({
  type: RESET_IMAGE
});

export const uploadFile = files => dispatch =>
  request()
    .post(`${API.URL}/api/upload`)
    .attach('fileToUpload', files[0])
    .end((error, res) => {
      !error && dispatch(uploadFileSuccess(res));
    });
