const Alert = {
  SHOW_ALERT: (state, action) =>
    Object.assign({}, state, {show: action.show}),
  MESSAGE_ALERT: (state, action) =>
    Object.assign({}, state, {message: action.message}),
  VIEW_ALERT: (state, action) =>
    Object.assign({}, state, {view: action.view})
};

export default Alert;
