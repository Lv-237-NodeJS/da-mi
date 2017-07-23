import { browserHistory } from 'react-router';
import { API, request } from 'src/helper';

const CREATE_NEW_EVENT_SUCCESS = 'CREATE_NEW_EVENT_SUCCESS';
const CREATE_NEW_EVENT_FAILURE = 'CREATE_NEW_EVENT_FAILURE';
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
      dispatch(createNewEventFailure(JSON.parse(res.text).eror)) ||
      dispatch(createNewEventSuccess(JSON.parse(res.text).event));
    });
