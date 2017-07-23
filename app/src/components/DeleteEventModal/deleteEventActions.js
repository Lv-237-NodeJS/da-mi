import { API, request } from 'src/helper';
import { browserHistory } from 'react-router';

const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';
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

const deleteEventSuccess = res => {
  browserHistory.push('/events');
  return {
    type: DELETE_EVENT_SUCCESS,
    payload: res
  };
};

const deleteEventFailure = res => ({
  type: DELETE_EVENT_FAILURE,
  status: res
});

export const deleteEvent = eventId => dispatch =>
  request()
    .delete(`${API.URL}/api/event/${eventId}`)
    .send(eventId)
    .end((err, res) => {
      dispatch(messageAlert(JSON.parse(res.text).message));
      dispatch(messageView(JSON.parse(res.text).view));
      dispatch(showAlert(true));
      (err || !res.ok) &&
      dispatch(deleteEventFailure(JSON.parse(res.text).eror)) ||
      dispatch(deleteEventSuccess(res));
    });
