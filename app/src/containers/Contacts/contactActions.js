import { request, API } from 'src/helper';

const SHOW_MODAL = 'SHOW_MODAL';
const CONTACT_REQUEST = 'CONTACT_REQUEST';
const MESSAGE_MODAL = 'MESSAGE_MODAL';

export function showModal(show) {
  return {
    type: SHOW_MODAL,
    show: show
  };
}

export function messageModal(message) {
  return {
    type: MESSAGE_MODAL,
    message: message
  };
}

export function contactRequest() {
  return {type: CONTACT_REQUEST};
}

export function contactInfo(data) {
  return dispatch => {
    dispatch(contactRequest());
    request()
      .post(`${API.URL}/api/support`)
      .send(data)
      .end((err, res) => {
        (res.status == 200) && dispatch(messageModal(JSON.parse(res.text).message)) &&
        dispatch(showModal(true)) || dispatch(messageModal(JSON.parse(res.text).message)) &&
        dispatch(showModal(true));
      });
  };
}
