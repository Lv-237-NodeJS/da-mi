const eventReducer = {
  EDIT_EVENT_SUCCESS: (state, action) => ({
    ...state,
    illegalInput: false,
    isUpdated: true,
    updatedEvent: action.payload,
    current: action.payload
  }),
  FETCH_EVENT_BY_ID_FULFILLED: (state, action) => ({
    ...state,
    current: action.payload,
    guestStatus: action.guestStatus
  }),
  FETCH_EVENT_BY_ID_REJECTED: (state, action) => ({
    ...state,
    error: action.payload,
  })
};

export default eventReducer;
