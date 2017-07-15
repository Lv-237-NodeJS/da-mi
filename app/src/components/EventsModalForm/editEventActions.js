import { API, request } from 'src/helper';

const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

export const editEventSuccess = res => {
  return {
    type: EDIT_EVENT_SUCCESS,
    payload: res.body
  };
};

export const editEventFailure = res => {
  return {
    type: EDIT_EVENT_FAILURE
  };
};

export const editEvent = event => dispatch =>
  request()
    .put(`${API.URL}/api/event/${event.id}`)
    .send(event)
    .end((err, res) => {
      (err || !res.ok) &&
      dispatch(editEventFailure(res)) ||
      dispatch(editEventSuccess(res));
    });
