import request from './../helper/request';
import { API } from './../helper/constants';
import { browserHistory } from 'react-router';

const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const CHECK_TOKEN = 'CHECK_TOKEN';

export default function loginReduser(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER_FAILURE:
      return {
        illegalInput: true
      };
    case LOGIN_USER_SUCCESS:
      return {
        illegalInput: false,
        isAuth: true
      };
    case LOGOUT_USER:
      return {
        isAuth: false
      };
    case CHECK_TOKEN:
      return {
        isAuth: action.isAuth
      };
    default:
      return state;
  }
}

export function loginUserSuccess(token) {
  sessionStorage.setItem('token', token);
  browserHistory.push('/events');
  return {
    type: LOGIN_USER_SUCCESS
  };
}

export function loginUserFailure() {
  return {
    type: LOGIN_USER_FAILURE
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  };
}

export function checkToken() {
  let isToken;
  sessionStorage.getItem('token') ?
    isToken = true :
    isToken = false;
  return {
    type: CHECK_TOKEN,
    isAuth: isToken
  };
}

export function logout() {
  sessionStorage.removeItem('token');
  browserHistory.push('/');
  return {
    type: LOGOUT_USER
  };
}

export function loginUser(email, password) {
  let user = {
    email: email,
    password: password
  };
  return dispatch => {
    dispatch(loginUserRequest());
    request()
      .post(API.HOST + API.PORT + '/api/auth/login')
      .send(user)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(loginUserFailure());
        } else {
          const token = JSON.parse(res.text).token;
          dispatch(loginUserSuccess(token));
        }
      });
  };
}
