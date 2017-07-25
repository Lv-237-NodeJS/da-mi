const getdonorReducer = {
  GET_DONOR_FAILURE: (state, action) => ({
    ...state,
    error: true
  }),
  GET_DONOR_SUCCESS: (state, action) => ({
    ...state,
    donor: action.payload
  }),
  CREATE_DONOR_FAILURE: (state, action) => ({
    ...state,
    error: true
  }),
  CREATE_DONOR_SUCCESS: (state, action) => ({
    ...state,
    donor: action.payload
  })
};

export default getdonorReducer;
