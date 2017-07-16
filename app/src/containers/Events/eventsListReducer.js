const eventListReducer = {
  RETRIEVE_EVENTS_SUCCESS: (state, action) => ({
    ...state,
    events: action.payload
  }),
};

export default eventListReducer;
