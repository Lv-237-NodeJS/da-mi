const profileReducer =  {
  RETRIEVE_PROFILE: (state, action) => ({
    ...state
  }),
  RETRIEVE_PROFILE_SUCCESS: (state, action) => ({
    ...state,
    data: action.payload
  }),
  RETRIEVE_PROFILE_FAILURE: (state, action) => ({
    ...state
  }),
  UPDATE_PROFILE: (state, action) => ({
    ...state
  }),
  UPDATE_PROFILE_SUCCESS: (state, action) => ({
    ...state,
    data: action.payload
  }),
  UPDATE_PROFILE_FAILURE: (state, action) => ({
    ...state
  })
};

export default profileReducer;
