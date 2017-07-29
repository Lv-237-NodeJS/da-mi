export const UploadFileReducers = {
  UPLOAD_FILE_SUCCESS: (state, action) => ({
    ...state,
    fileUrl: action.payload
  }),

  UPLOAD_FILE_FAILURE: (state, action) => ({
    ...state
  }),

  RESET_IMAGE: (state, action) => ({
    ...state,
    fileUrl: ''
  })
};

export default UploadFileReducers;
