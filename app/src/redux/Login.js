import request from 'superagent';
import { push } from 'react-router-redux';
import { API } from './../helper/constants';

const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const CHECK_TOKEN = 'CHECK_TOKEN';

const initialState = {
  illegalInput: false,
  isToken: false
};

export default function loginReduser(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_FAILURE:
      return Object.assign({}, {
        illegalInput: true
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, {
        illegalInput: false,
        isToken: true
      });
    case LOGOUT_USER:
      return Object.assign({}, {
        isToken: false
      });
    case CHECK_TOKEN:
      return Object.assign({}, {
        isToken: action.isToken
      });
    default:
      return state
  }
}

export function loginUserSuccess(token) {
  sessionStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    isToken: true
  }
}

export function loginUserFailure() {
  return {
    type: LOGIN_USER_FAILURE
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function checkToken() {
  let isToken;
  sessionStorage.getItem('token')? isToken = true:
    isToken = false;
  return {
    type: CHECK_TOKEN,
    isToken: isToken
  }
}

export function logout(dispatch) {
  sessionStorage.removeItem('token');
  push('/');
  return {
    type: LOGOUT_USER,
    isToken: false
  }
}

export function loginUser(email, password) {
  return dispatch => {
    dispatch(loginUserRequest());
    request
      .post(API.HOST + API.PORT + '/api/auth/login')
      .send({email: email, password: password})
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(loginUserFailure());
        } else {
          const token = JSON.parse(res.text).token;
          dispatch(loginUserSuccess(token));
        }
      })
    }
}
