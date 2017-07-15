const profileReducer =  {
  RETRIEVE_PROFILE: (state, action) => {
    return {
      ...state
    };
  },
  RETRIEVE_PROFILE_SUCCESS: (state, action) => {
    return {
      ...state,
      data: action.payload
    };
  },
  RETRIEVE_PROFILE_FAILURE: (state, action) => {
    return {
      ...state
    };
  },
  UPDATE_PROFILE: (state, action) => {
    return {
      ...state
    };
  },
  UPDATE_PROFILE_SUCCESS: (state, action) => {
    return {
      ...state,
      data: action.payload
    };
  },
  UPDATE_PROFILE_FAILURE: (state, action) => {
    return {
      ...state
    };
  }
};

export default profileReducer;
