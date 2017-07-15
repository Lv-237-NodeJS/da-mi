const newEventReducer = {
  CREATE_NEW_EVENT_FAILURE: (state, action) => {
    return {
      ...state,
      error: true
    };
  },
  CREATE_NEW_EVENT_SUCCESS: (state, action) => {
    return {
      ...state,
      illegalInput: false,
      isCreated: true
    };
  }
};

export default newEventReducer;
