import { request, API } from 'src/helper';

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

export const contactInfo = data => dispatch =>
  request()
    .post(`${API.URL}/api/support`)
    .send(data)
    .end((err, res) => {
      (res.status == 200) && dispatch(messageModal(JSON.parse(res.text).message)) &&
      dispatch(showModal(true)) || dispatch(messageModal(JSON.parse(res.text).message)) &&
      dispatch(showModal(true));
    });
