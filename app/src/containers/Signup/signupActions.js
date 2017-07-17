import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';

const SHOW_ALERT = 'SHOW_ALERT';
const MESSAGE_ALERT = 'MESSAGE_ALERT';
const VIEW_ALERT = 'VIEW_ALERT'

export const showAlert = show => ({
  type: SHOW_ALERT,
  show: show
});

const messageAlert = (message, time) => ({
  type: MESSAGE_ALERT,
  message: message,
  time: time
});

const messageView = view => ({
  type: VIEW_ALERT,
  view: view
});

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
        (res.status == 201) && (dispatch(messageAlert(JSON.parse(res.text).message, 5000)) &&
        dispatch(messageView(JSON.parse(res.text).view)) && dispatch(showAlert(true))) &&
        browserHistory.push('/') || dispatch(messageAlert(JSON.parse(res.text).message, 5000)) &&
        dispatch(messageView(JSON.parse(res.text).view)) && dispatch(showAlert(true));
      });
};
