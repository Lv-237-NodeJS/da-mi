const eventReducer = {
  EDIT_EVENT_FAILURE: (state, action) => {
    return {
      ...state,
      error: true
    };
  },
  EDIT_EVENT_SUCCESS: (state, action) => {
    return {
      ...state,
      illegalInput: false,
      isUpdated: true,
      updatedEvent: action.payload,
      current: action.payload
    };
  },
  FETCH_EVENT_BY_ID: (state, action) => {
    return {
      ...state,
    };
  },
  FETCH_EVENT_BY_ID_FULFILLED: (state, action) => {
    return {
      ...state,
      current: action.payload,
    };
  },
  FETCH_EVENT_BY_ID_REJECTED: (state, action) => {
    return {
      ...state,
      error: action.payload,
    };
  }
};

export default eventReducer;
