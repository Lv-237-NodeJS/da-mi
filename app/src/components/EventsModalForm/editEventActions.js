import { API, request } from 'src/helper';
import {SHOW_ALERT, MESSAGE_ALERT, VIEW_ALERT,
  showAlert, messageAlert, messageView } from 'src/components/Alerts/AlertsActions';

const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

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
      dispatch(editEventFailure(JSON.parse(res.text).error)) ||
      dispatch(editEventSuccess(JSON.parse(res.text).event));
    });
