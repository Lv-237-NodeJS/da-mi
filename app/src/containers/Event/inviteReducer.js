const inviteReducer = {
  GET_EMAILS: (state, action) => ({
    guests: [...action.guests]
  }),
  DELETE_GUEST: (state, action) => ({
    guests: state.guests.filter(guest => guest.id !== action.id)
  }),
  SAVE_EMAILS: (state, action) => ({
    ...state,
    guests: [...state.guests, ...action.guests]
  })
};

export default inviteReducer;
