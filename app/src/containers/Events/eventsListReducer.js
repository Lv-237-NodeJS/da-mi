export const eventListReducer = {
  RETRIEVE_EVENTS: (state, action) => {
    return {
      ...state
    };
  },
  RETRIEVE_EVENTS_SUCCESS: (state, action) => {
    return {
      ...state,
      events: action.payload
    };
  },
  RETRIEVE_EVENTS_FAILURE: (state, action) => {
    return {
      ...state
    };
  }
};

export default eventListReducer;
