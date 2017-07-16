import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';

const CREATE_NEW_EVENT_SUCCESS = 'CREATE_NEW_EVENT_SUCCESS';
const CREATE_NEW_EVENT_FAILURE = 'CREATE_NEW_EVENT_FAILURE';

const createNewEventSuccess = res => {
  const eventId = res.body.id;
  browserHistory.push(`/events/${eventId}`);
  return {
    type: CREATE_NEW_EVENT_SUCCESS,
    status: res.statusCode
  };
};

const createNewEventFailure = res => ({
  type: CREATE_NEW_EVENT_FAILURE,
  status: res.statusCode
});

export const createNewEvent = event => dispatch =>
  request()
    .post(`${API.URL}/api/events`)
    .send(event)
    .end((err, res) => {
      (err || !res.ok) &&
        dispatch(createNewEventFailure(res)) ||
        dispatch(createNewEventSuccess(res));
    });
