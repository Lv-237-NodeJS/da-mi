import { API, request } from 'src/helper';
import { browserHistory } from 'react-router';

const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

const deleteEventSuccess = res => {
  browserHistory.push('/events');
  return {
    type: DELETE_EVENT_SUCCESS,
    payload: res.body
  };
};

const deleteEventFailure = res => ({
  type: DELETE_EVENT_FAILURE,
  status: res.statusCode
});

export const deleteEvent = eventId => dispatch =>
  request()
    .delete(`${API.URL}/api/event/${eventId}`)
    .send(eventId)
    .end((err, res) => {
      (err || !res.ok) &&
        dispatch(deleteEventFailure(res)) ||
        dispatch(deleteEventSuccess(res));
    });
