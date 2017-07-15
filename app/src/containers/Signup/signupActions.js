import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';

const SHOW_MODAL = 'SHOW_MODAL';
const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
const MESSAGE_MODAL = 'MESSAGE_MODAL';

export const showModal = show => {
  return {
    type: SHOW_MODAL,
    show: show
  };
};

export const messageModal = message => {
  return {
    type: MESSAGE_MODAL,
    message: message
  };
};

export const signupRequest = () => {
  return {type: SIGNUP_REQUEST};
};

export const signupUser = (email, password) => {
  let data = {
    email: email,
    password: password
  };

  return dispatch => {
    dispatch(signupRequest());
    request()
      .post(`${API.URL}/api/users`)
      .send(data)
      .end((err, res) => {
        (res.status == 201) && (dispatch(messageModal(JSON.parse(res.text).message)) &&
        dispatch(showModal(true))) && browserHistory.push('/') ||
        dispatch(messageModal(JSON.parse(res.text).message)) && dispatch(showModal(true));
      });
  };
};
