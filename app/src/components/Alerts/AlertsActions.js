import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';

const SHOW_ALERT = 'SHOW_ALERT';
const MESSAGE_ALERT = 'MESSAGE_ALERT';
const VIEW_ALERT = 'VIEW_ALERT';

export const showAlert = show => ({
  type: SHOW_ALERT,
  show: show
});

export const messageAlert = message => ({
  type: MESSAGE_ALERT,
  message: message,
});

export const messageView = view => ({
  type: VIEW_ALERT,
  view: view
});

export const contactInfo = data => dispatch =>
  request()
    .post(`${API.URL}/api/support`)
    .send(data)
    .end((err, res) => {
      dispatch(messageAlert(JSON.parse(res.text).message)) &&
      dispatch(messageView(JSON.parse(res.text).view)) && dispatch(showAlert(true));
    });

export const resetPassword = (oldPassword, newPassword) => {
  let data = {
    oldPassword: oldPassword,
    newPassword: newPassword
  };

  return dispatch =>
    request()
      .post(`${API.URL}/api/user/changepassword`)
      .send(data)
      .end((err, res) => {
        dispatch(messageAlert(JSON.parse(res.text).message));
        dispatch(messageView(JSON.parse(res.text).view));
        dispatch(showAlert(true));
      });
};

export const signupUser = (email, password) => {
  let data = {
    email: email,
    password: password
  };

  return dispatch =>
    request()
      .post(`${API.URL}/api/users`)
      .send(data)
      .end((err, res) => {
        dispatch(messageAlert(JSON.parse(res.text).message));
        dispatch(messageView(JSON.parse(res.text).view));
        dispatch(showAlert(true));
        (res.status == 201) && browserHistory.push('/');
      });
};
