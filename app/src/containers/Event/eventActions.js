import { API, request  } from 'src/helper';

const FETCH_EVENT_BY_ID_FULFILLED = 'FETCH_EVENT_BY_ID_FULFILLED';
const FETCH_EVENT_BY_ID_REJECTED = 'FETCH_EVENT_BY_ID_REJECTED';

export const fetchEventById = eventId => dispatch => {
  return request()
    .get(`${API.URL}/api/event/${eventId}`)
    .end((err, res) => {
      if (err) {
        dispatch({
          type: FETCH_EVENT_BY_ID_REJECTED,
          payload: err,
        });
      } else {
        dispatch({
          type: FETCH_EVENT_BY_ID_FULFILLED,
          payload: res.body,
        });
      }
    });
};
