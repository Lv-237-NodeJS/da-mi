import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';
import {SHOW_ALERT, MESSAGE_ALERT, VIEW_ALERT,
 showAlert, messageAlert, messageView } from 'src/components/Alerts/AlertsActions';

const CREATE_NEW_EVENT_SUCCESS = 'CREATE_NEW_EVENT_SUCCESS';
const CREATE_NEW_EVENT_FAILURE = 'CREATE_NEW_EVENT_FAILURE';

const createNewEventSuccess = res => {
  const eventId = res.id;
  browserHistory.push(`/events/${eventId}`);
  return {
    type: CREATE_NEW_EVENT_SUCCESS,
    status: res
  };
};

const createNewEventFailure = res => ({
  type: CREATE_NEW_EVENT_FAILURE,
  status: res
});

export const createNewEvent = event => dispatch =>
  request()
    .post(`${API.URL}/api/events`)
    .send(event)
    .end((err, res) => {
      dispatch(messageAlert(JSON.parse(res.text).message));
      dispatch(messageView(JSON.parse(res.text).view));
      dispatch(showAlert(true));
      (err || !res.ok) &&
      dispatch(createNewEventFailure(JSON.parse(res.text).error)) ||
      dispatch(createNewEventSuccess(JSON.parse(res.text).event));
    });
