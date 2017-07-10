import { API, request } from 'src/helper';

const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

const initialState = {
  updatedEvent: {},
  isUpdated: false,
  illegalInput: true,
  error: false
};

export default function newEventReducers(state = initialState, action) {
  switch (action.type) {
    case EDIT_EVENT_FAILURE:
      return {
        ...state,
        error: true
      };
    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        illegalInput: false,
        isUpdated: true,
        updatedEvent: action.payload
      };
    default:
      return state;
  }
}

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
