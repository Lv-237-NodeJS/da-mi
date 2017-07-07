import { API, request  } from 'src/helper';

const FETCH_EVENT_BY_ID = 'FETCH_EVENT_BY_ID';
const FETCH_EVENT_BY_ID_FULFILLED = 'FETCH_EVENT_BY_ID_FULFILLED';
const FETCH_EVENT_BY_ID_REJECTED = 'FETCH_EVENT_BY_ID_REJECTED';
const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';

export const fetchEventById = eventId => {
  return dispatch => {
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
};

const initialState = {
  current: {},
  fetching: false,
  fetched: false,
  error: null,
};

export const eventReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_BY_ID: {
      return {...state, fetching: true};
    }
    case FETCH_EVENT_BY_ID_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        current: action.payload,
      };
    }
    case FETCH_EVENT_BY_ID_REJECTED: {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        current: action.payload
      };

    default: return state;
  }
};

export default eventReducers;
