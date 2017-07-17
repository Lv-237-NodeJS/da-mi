const signupReducer = {
  SHOW_ALERT: (state, action) =>
    Object.assign({}, state, {show: action.show}),
  MESSAGE_ALERT: (state, action) =>
    Object.assign({}, state, {message: action.message, time: action.time}),
  VIEW_ALERT: (state, action) =>
    Object.assign({}, state, {view: action.view})
};

export default signupReducer;
