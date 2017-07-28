import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';
import { showResponseMessage } from 'src/components/Alerts/AlertsActions';

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
      showResponseMessage(dispatch, res);
      (err || !res.ok) &&
      dispatch(createNewEventFailure(res.body.error)) ||
      dispatch(createNewEventSuccess(res.body.event));
    });
