const editEventReducer = {
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
      updatedEvent: action.payload
    };
  }
};

export default editEventReducer;
