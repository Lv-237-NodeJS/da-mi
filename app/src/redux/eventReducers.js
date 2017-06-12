const FETCH_EVENTS = 'FETCH_EVENTS';
const FETCH_EVENTS_FULFILLED = 'FETCH_EVENTS_FULFILLED';
const FETCH_EVENTS_REJECTED = 'FETCH_EVENTS_REJECTED';
import  API  from '../helper/constants';

import request from 'superagent';

export const fetchEvents = () => {
  return (dispatch) => {
    request
    .get(API.HOST + API.PORT + '/api/events')
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
};

export const eventReducers = (
  state = {
    events: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) => {
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

    default: return state;
  }
};

export default eventReducers;
