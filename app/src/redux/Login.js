// import { pushState } from 'redux-router';
import request from 'superagent';
import { API } from './../helper/constants';

const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';

const initialState = {notAutorized: false};

export default function loginReduser(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_FAILURE:
      return [...state, Object.assign({}, action.notAutorized)];
    default:
      return state
  }
}

export function loginUserSuccess(token) {
  sessionStorage.setItem('token', token);
  window.location.reload();
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error,  notAutorized) {
  sessionStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    notAutorized,
    payload: {
      notAutorized: notAutorized
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    sessionStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

// export function logoutAndRedirect() {
//     return (dispatch, state) => {
//         dispatch(logout());
//         dispatch(pushState(null, '/'));
//     }
// }

export function loginUser(email, password) {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return request
      .post(API.HOST + API.PORT + '/api/auth/login')
      .send({email: email, password: password})
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(loginUserFailure(err, true));
        } else {
          const token = JSON.parse(res.text).token;
          dispatch(loginUserSuccess(token));
          // dispatch(pushState(null, '/'));
          // window.location.reload();
        }
      })
    }
}
