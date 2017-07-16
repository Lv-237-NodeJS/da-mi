export const eventListReducer = {
  RETRIEVE_EVENTS: (state, action) => ({
    ...state
  }),
  RETRIEVE_EVENTS_SUCCESS: (state, action) => ({
    ...state,
    events: action.payload
  }),
  RETRIEVE_EVENTS_FAILURE: (state, action) => ({
    ...state
  })
};

export default eventListReducer;
