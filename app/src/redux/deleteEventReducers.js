import { API, request } from 'src/helper';
import { browserHistory } from 'react-router';

const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

const initialState = {
  isDeleted: false,
  error: false
};

export default function deleteEventReducers(state = initialState, action) {
  switch (action.type) {
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        error: true
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        isDeleted: true
      };
    default:
      return state;
  }
}

export function deleteEventSuccess(res) {
  browserHistory.push('/events');
  return {
    type: DELETE_EVENT_SUCCESS,
    payload: res.body
  };
}

export function deleteEventFailure(res) {
  return {
    type: DELETE_EVENT_FAILURE
  };
}

export function deleteEvent(eventId) {
  return dispatch => {
    request()
      .delete(`${API.URL}/api/event/${eventId}`)
      .send(eventId)
      .end((err, res) => {
        (err || !res.ok) &&
          dispatch(deleteEventFailure(res)) ||
          dispatch(deleteEventSuccess(res));
      });
  };
}
