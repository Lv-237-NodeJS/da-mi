import request from 'superagent';
import { browserHistory } from 'react-router';
import messages from '../helper/messages';
import  API  from '../helper/constants';

const SHOW_MODAL = 'SHOW_MODAL';
const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
const MESSAGE_MODAL = 'MESSAGE_MODAL';

export default function changeReducer(state = {show: false, message:''}, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {show: action.show});
    case MESSAGE_MODAL:
      return Object.assign({}, state, {message: action.message});
    default:
      return state;
  }
};

export function showModal(show) {
  return {
    type: SHOW_MODAL,
    show: show
  };
};

export function messageModal(message) {
  return {
    type: MESSAGE_MODAL,
    message: message
  };
};

export function signupRequest() {
  return {
    type: SIGNUP_REQUEST
};
};


export function signupUser(email, password) {
  let data = {
    email: email,
    password: password
  };

return dispatch => {

  dispatch(signupRequest());
    request
    .post(API.HOST + API.PORT + '/api/auth/Signup')
    .send(data)
    .end(function(err, res) {
      if (err || !res.ok) {
        return (
          dispatch(messageModal(messages.error)),
          dispatch(showModal(true))
        )
      } else {
        return (
          browserHistory.push('/'),
          dispatch(messageModal(messages.signup)),
          dispatch(showModal(true))                 
        )
      }
    });
  }
}
