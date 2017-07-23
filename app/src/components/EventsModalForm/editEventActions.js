import { API, request } from 'src/helper';

const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';
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

export const editEventSuccess = res => ({
  type: EDIT_EVENT_SUCCESS,
  payload: res
});

export const editEventFailure = res => ({
  type: EDIT_EVENT_FAILURE
});

export const editEvent = event => dispatch =>
  request()
    .put(`${API.URL}/api/event/${event.id}`)
    .send(event)
    .end((err, res) => {
      dispatch(messageAlert(JSON.parse(res.text).message));
      dispatch(messageView(JSON.parse(res.text).view));
      dispatch(showAlert(true));
      (err || !res.ok) &&
      dispatch(editEventFailure(JSON.parse(res.text).eror)) ||
      dispatch(editEventSuccess(JSON.parse(res.text).event));
    });
