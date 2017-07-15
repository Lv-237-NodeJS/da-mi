import { API, request } from 'src/helper';

const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

export function editEventSuccess(res) {
  return {
    type: EDIT_EVENT_SUCCESS,
    payload: res.body
  };
}

export function editEventFailure(res) {
  return {
    type: EDIT_EVENT_FAILURE
  };
}

export function editEvent(event) {
  return dispatch => {
    request()
      .put(`${API.URL}/api/event/${event.id}`)
      .send(event)
      .end((err, res) => {
        (err || !res.ok) &&
          dispatch(editEventFailure(res)) ||
          dispatch(editEventSuccess(res));
      });
  };
}
