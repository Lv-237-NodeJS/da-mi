import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';

const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';
const CHECK_TOKEN = 'CHECK_TOKEN';

export const loginUserSuccess = (token, userId, profileId) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userId', userId);
  sessionStorage.setItem('profileId', profileId);
  browserHistory.push('/events');
  return {
    type: LOGIN_USER_SUCCESS,
    userId: userId,
    profileId: profileId
  };
};

export const loginUserFailure = message => ({
  type: LOGIN_USER_FAILURE,
  message
});

export const checkToken = () => ({
  type: CHECK_TOKEN,
  isAuth: !!sessionStorage.getItem('token')
});

export const logout = () => {
  sessionStorage.clear();
  browserHistory.push('/');
  return {
    type: LOGOUT_USER
  };
};

export const loginUser = (email, password) => {
  const user = {email, password};
  let token;
  let userId;
  let profileId;
  return dispatch => request()
    .post(`${API.URL}/api/auth/login`)
    .send(user)
    .end((err, res) => {
      (err || !res.ok) &&
      dispatch(loginUserFailure(JSON.parse(res.text).message)) ||
      ({token, user_id: userId, profile_id: profileId} = JSON.parse(res.text)) &&
      dispatch(loginUserSuccess(token, userId, profileId));
    });
};
