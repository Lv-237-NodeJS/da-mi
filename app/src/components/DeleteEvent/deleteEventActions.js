import { API, request } from 'src/helper';
import { browserHistory } from 'react-router';
import { showResponseMessage } from 'src/components/Alerts/AlertsActions';

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
      showResponseMessage(dispatch, res);
      (err || !res.ok) &&
      dispatch(deleteEventFailure(res.body.error)) ||
      dispatch(deleteEventSuccess(res));
    });
