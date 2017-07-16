import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';

const SHOW_MODAL = 'SHOW_MODAL';
const MESSAGE_MODAL = 'MESSAGE_MODAL';

const showModal = show => ({
  type: SHOW_MODAL,
  show: show
});

const messageModal = message => ({
  type: MESSAGE_MODAL,
  message: message
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
        (res.status == 201) && (dispatch(messageModal(JSON.parse(res.text).message)) &&
        dispatch(showModal(true))) && browserHistory.push('/') ||
        dispatch(messageModal(JSON.parse(res.text).message)) && dispatch(showModal(true));
      });
};
