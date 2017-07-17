const initialState = {
  isDeleted: false,
  error: false
};

const deleteEventReducer = {
  DELETE_EVENT_FAILURE: (state, action) => ({
    ...state,
    error: true
  }),
  DELETE_EVENT_SUCCESS: (state, action) => ({
    ...state,
    isDeleted: true
  })
};

export default deleteEventReducer;
