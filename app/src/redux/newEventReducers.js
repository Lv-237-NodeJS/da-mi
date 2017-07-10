import { API, request } from 'src/helper';
import { browserHistory } from 'react-router';

const CREATE_NEW_EVENT_SUCCESS = 'CREATE_NEW_EVENT_SUCCESS';
const CREATE_NEW_EVENT_FAILURE = 'CREATE_NEW_EVENT_FAILURE';

const initialState = {
  isCreated: false,
  illegalInput: true,
  error: false
};

export default function newEventReducers(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_EVENT_FAILURE:
      return {
        ...state,
        error: true
      };
    case CREATE_NEW_EVENT_SUCCESS:
      return {
        ...state,
        illegalInput: false,
        isCreated: true
      };
    default:
      return state;
  }
}

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
