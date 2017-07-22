import { API, request  } from 'src/helper';

const FETCH_EVENT_BY_ID_FULFILLED = 'FETCH_EVENT_BY_ID_FULFILLED';
const FETCH_EVENT_BY_ID_REJECTED = 'FETCH_EVENT_BY_ID_REJECTED';
const SHOW_EVENT_BUTTONS = 'SHOW_EVENT_BUTTONS';

const fetchEventFullfilled = res => ({
  type: FETCH_EVENT_BY_ID_FULFILLED,
  payload: res.body.event,
  guestStatus: res.body.status
});

const fetchEventRejected = err => ({
  type: FETCH_EVENT_BY_ID_REJECTED,
  payload: err,
});

export const fetchEventById = eventId => dispatch =>
  request()
    .get(`${API.URL}/api/event/${eventId}`)
    .end((err, res) => {
      err &&
      dispatch(fetchEventRejected(err)) ||
      dispatch(fetchEventFullfilled(res));
    });
