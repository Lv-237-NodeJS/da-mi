import { request, API } from 'src/helper';

const SHOW_ALERT = 'SHOW_ALERT';
const MESSAGE_ALERT = 'MESSAGE_ALERT';
const VIEW_ALERT = 'VIEW_ALERT';

export const showAlert = show => ({
  type: SHOW_ALERT,
  show: show
});

const messageAlert = message => ({
  type: MESSAGE_ALERT,
  message: message
});

const messageView = view => ({
  type: VIEW_ALERT,
  view: view
});

export const contactInfo = data => dispatch =>

  request()
    .post(`${API.URL}/api/support`)
    .send(data)
    .end((err, res) => {
      (res.status == 200) && dispatch(messageAlert(JSON.parse(res.text).message)) &&
      dispatch(messageView(JSON.parse(res.text).view)) && dispatch(showAlert(true));
    });
