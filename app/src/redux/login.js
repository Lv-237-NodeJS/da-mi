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
        ...state,
        illegalInput: true
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        illegalInput: false,
        isAuth: true,
        userId: action.userId
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuth: false
      };
    case CHECK_TOKEN:
      return {
        ...state,
        isAuth: action.isAuth
      };
    default:
      return state;
  }
}

export function loginUserSuccess(token, userId) {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userId', userId);
  browserHistory.push('/events');
  return {
    type: LOGIN_USER_SUCCESS,
    userId: userId
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
  return {
    type: CHECK_TOKEN,
    isAuth: !!sessionStorage.getItem('token')
  };
}

export function logout() {
  sessionStorage.clear();
  browserHistory.push('/');
  return {
    type: LOGOUT_USER
  };
}

export function loginUser(email, password) {
  const user = {
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
          const userId = JSON.parse(res.text).user_id;
          dispatch(loginUserSuccess(token, userId));
        }
      });
  };
}
