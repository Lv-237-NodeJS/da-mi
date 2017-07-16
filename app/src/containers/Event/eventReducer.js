const eventReducer = {
  EDIT_EVENT_FAILURE: (state, action) => ({
    ...state,
    error: true
  }),
  EDIT_EVENT_SUCCESS: (state, action) => ({
    ...state,
    illegalInput: false,
    isUpdated: true,
    updatedEvent: action.payload,
    current: action.payload
  }),
  FETCH_EVENT_BY_ID: (state, action) => ({
    ...state,
  }),
  FETCH_EVENT_BY_ID_FULFILLED: (state, action) => ({
    ...state,
    current: action.payload,
  }),
  FETCH_EVENT_BY_ID_REJECTED: (state, action) => ({
    ...state,
    error: action.payload,
  })
};

export default eventReducer;
