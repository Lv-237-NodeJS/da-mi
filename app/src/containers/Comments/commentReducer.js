const commentReducer = {
  CREATE_COMMENT_SUCCESS: (state, action) => ({
    ...state,
    comment: action.payload,
  }),
  CREATE_COMMENT_FAILURE: (state, action) => ({
    ...state,
    error: action.payload
  }),
  RETRIEVE_COMMENTS_SUCCESS: (state, action) => ({
    ...state,
    comments: action.payload,
  }),
  RETRIEVE_COMMENTS_FAILURE: (state, action) => ({
    ...state,
  }),
  DELETE_COMMENT_SUCCESS: (state, action) => ({
    ...state,
    commentDeleted: action.payload,
  }),
  DELETE_COMMENT_FAILURE: (state, action) => ({
    ...state,
    error: action.payload,
  })
};

export default commentReducer;
