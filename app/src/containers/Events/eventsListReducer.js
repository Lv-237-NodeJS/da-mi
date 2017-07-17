const eventListReducer = {
  RETRIEVE_EVENTS_SUCCESS: (state, action) => ({
    ...state,
    events: action.myEvents,
    myInvitations: action.myInvitations
  }),
};

export default eventListReducer;
