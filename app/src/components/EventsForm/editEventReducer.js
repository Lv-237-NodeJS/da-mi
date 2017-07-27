const editEventReducer = {
  EDIT_EVENT_FAILURE: (state, action) => ({
    ...state,
    error: true
  }),
  EDIT_EVENT_SUCCESS: (state, action) => ({
    ...state,
    illegalInput: false,
    isUpdated: true,
    updatedEvent: action.payload
  })
};

export default editEventReducer;
