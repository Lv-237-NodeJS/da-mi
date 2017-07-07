import { browserHistory } from 'react-router';
import { API, messages, request } from 'src/helper';

const SHOW_MODAL = 'SHOW_MODAL';
const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
const MESSAGE_MODAL = 'MESSAGE_MODAL';

export default function changeReducer(state = {show: false, message: ''}, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {show: action.show});
    case MESSAGE_MODAL:
      return Object.assign({}, state, {message: action.message});
    default:
      return state;
  }
}

export function showModal(show) {
  return {
    type: SHOW_MODAL,
    show: show
  };
}

export function messageModal(message) {
  return {
    type: MESSAGE_MODAL,
    message: message
  };
}

export function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  };
}

export function signupUser(email, password) {
  let data = {
    email: email,
    password: password
  };
  return dispatch => {
    dispatch(signupRequest());
    request()
      .post(API.HOST + API.PORT + '/api/users')
      .send(data)
      .end(function(err, res) {
        (res.status == 201) && (dispatch(messageModal(messages.successSignup)) &&
        dispatch(showModal(true))) && browserHistory.push('/') ||
        dispatch(messageModal(err.response.text)) && dispatch(showModal(true));
      });
  };
}
