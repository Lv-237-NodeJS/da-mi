const signupReducer = {
  SHOW_MODAL: (state, action) =>
    Object.assign({}, state, {show: action.show}),
  MESSAGE_MODAL: (state, action) =>
    Object.assign({}, state, {message: action.message})
};

export default signupReducer;
