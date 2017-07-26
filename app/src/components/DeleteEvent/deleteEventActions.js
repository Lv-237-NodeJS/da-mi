import { API, request } from 'src/helper';
import { browserHistory } from 'react-router';
import {SHOW_ALERT, MESSAGE_ALERT, VIEW_ALERT,
  showAlert, messageAlert, messageView } from 'src/components/Alerts/AlertsActions';

const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

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
      dispatch(deleteEventFailure(JSON.parse(res.text).error)) ||
      dispatch(deleteEventSuccess(res));
    });
