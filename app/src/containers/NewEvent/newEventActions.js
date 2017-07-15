import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';

const CREATE_NEW_EVENT_SUCCESS = 'CREATE_NEW_EVENT_SUCCESS';
const CREATE_NEW_EVENT_FAILURE = 'CREATE_NEW_EVENT_FAILURE';

export function createNewEventSuccess(res) {
  const eventId = res.body.id;
  browserHistory.push(`/events/${eventId}`);
  return {
    type: CREATE_NEW_EVENT_SUCCESS,
    status: res.statusCode
  };
}

export function createNewEventFailure(res) {
  return {
    type: CREATE_NEW_EVENT_FAILURE,
    status: res.statusCode
  };
}

export function createNewEvent(event) {
  return dispatch => {
    request()
      .post(`${API.URL}/api/events`)
      .send(event)
      .end((err, res) => {
        (err || !res.ok) &&
          dispatch(createNewEventFailure(res)) ||
          dispatch(createNewEventSuccess(res));
      });
  };
}
