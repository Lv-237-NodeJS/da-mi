const commentReducer = {
  CREATE_COMMENT_SUCCESS: (state, action) => {
    return {
      ...state,
      comment: action.payload,
    };
  },
  CREATE_COMMENT_FAILURE: (state, action) => {
    return {
      ...state,
      error: action.payload
    };
  },
  RETRIEVE_COMMENTS_SUCCESS: (state, action) => {
    return {
      ...state,
      comments: action.payload,
    };
  },
  RETRIEVE_COMMENTS_FAILURE: (state, action) => {
    return {
      ...state,
    };
  },
  DELETE_COMMENT_SUCCESS: (state, action) => {
    return {
      ...state,
      commentDeleted: action.payload,
    };
  },
  DELETE_COMMENT_FAILURE: (state, action) => {
    return {
      ...state,
      error: action.payload,
    };
  }
};

export default commentReducer;
