const FETCH_EVENTS = 'FETCH_EVENTS';
const FETCH_EVENTS_FULFILLED = 'FETCH_EVENTS_FULFILLED';
const FETCH_EVENTS_REJECTED = 'FETCH_EVENTS_REJECTED';
const apiUrl = 'http://localhost:8082';

import request from 'superagent';

export function fetchEvents() {
  return (dispatch) => {
    request
    .get(apiUrl + '/api/events')
    .end((err, res) => {
      if (err) {
        dispatch({
          type: FETCH_EVENTS_REJECTED,
          payload: err,
        });
      } else {
        dispatch({
          type: FETCH_EVENTS_FULFILLED,
          payload: res.body,
        });
      }
    });
  };
}

export default function reducer(state={
  events: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case FETCH_EVENTS: {
      return { ...state, fetching: true };
    }

    case FETCH_EVENTS_FULFILLED: {
      return {
              ...state,
              fetching: false,
              fetched: true,
              events: action.payload,
            };
    }

    case FETCH_EVENTS_REJECTED: {
      return {
              ...state,
              fetching: false,
              error: action.payload,
            };
    }
  }
  return state;
}
