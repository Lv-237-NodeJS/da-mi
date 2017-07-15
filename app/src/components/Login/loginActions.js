import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';

const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const CHECK_TOKEN = 'CHECK_TOKEN';

export function loginUserSuccess(token, userId, profileId) {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userId', userId);
  sessionStorage.setItem('profileId', profileId);
  browserHistory.push('/events');
  return {
    type: LOGIN_USER_SUCCESS,
    userId: userId,
    profileId: profileId
  };
}

export function loginUserFailure(message) {
  return {
    type: LOGIN_USER_FAILURE,
    message
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
  const user = {email, password};
  let token;
  let userId;
  let profileId;
  return dispatch => {
    dispatch(loginUserRequest());
    request()
      .post(API.HOST + API.PORT + '/api/auth/login')
      .send(user)
      .end((err, res) => {
        (err || !res.ok) &&
        dispatch(loginUserFailure(JSON.parse(res.text).message)) ||
        ({token, user_id: userId, profile_id: profileId} = JSON.parse(res.text)) &&
        dispatch(loginUserSuccess(token, userId, profileId));
      });
  };
}
