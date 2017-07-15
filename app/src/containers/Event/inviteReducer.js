const inviteReducer = {
  GET_EMAILS: (state, action) => {
    return {
      guests: [...action.guests]
    };
  },
  DELETE_GUEST: (state, action) => {
    return {
      guests: state.guests.filter(guest => guest.id !== action.id)
    };
  },
  SAVE_EMAILS: (state, action) => {
    return {
      ...state,
      guests: [...state.guests, ...action.guests]
    };
  }
};

export default inviteReducer;
