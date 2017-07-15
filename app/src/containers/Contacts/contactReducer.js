const changeReducer = {
  SHOW_MODAL: (action, state) =>
    Object.assign({}, state, {show: action.show}),
  MESSAGE_MODAL: (action, state) =>
    Object.assign({}, state, {message: action.message})
};

export default changeReducer;
