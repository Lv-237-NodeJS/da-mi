const newEventReducer = {
  CREATE_NEW_EVENT_FAILURE: (state, action) => ({
    ...state,
    error: true
  }),
  CREATE_NEW_EVENT_SUCCESS: (state, action) => ({
    ...state,
    illegalInput: false,
    isCreated: true
  })
};

export default newEventReducer;
