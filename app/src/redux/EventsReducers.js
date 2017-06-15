const RETRIEVE_EVENTS = 'RETRIEVE_EVENTS';
const RETRIEVE_EVENTS_SUCCESS = 'RETRIEVE_EVENTS_SUCCESS';
const RETRIEVE_EVENTS_FAILURE = 'RETRIEVE_EVENTS_FAILURE';
import  { API }  from './../helper/constants';
import request from './../helper/request';

export const retrieveEvents = () => {
  let token = sessionStorage.getItem('token');

  return (dispatch) => {
    return request
      .get(API.HOST + API.PORT + '/api/events')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: RETRIEVE_EVENTS_FAILURE,
            payload: err,});
        } else {
          dispatch({
            type: RETRIEVE_EVENTS_SUCCESS,
            payload: res.body,
          });
        }
      });
  };
};

const initialState = {
  events: [],
  fetching: false,
  fetched: false,
  error: null,
};

export const EventsReducers = (state = initialState, action) => {
  switch (action.type) {

    case RETRIEVE_EVENTS: {
      return { ...state, retrieving: true };
    }

    case RETRIEVE_EVENTS_SUCCESS: {
      return {
        ...state,
        retrieving: false,
        retrieved: true,
        events: action.payload,
      };
    }

    case RETRIEVE_EVENTS_FAILURE: {
      return {
        ...state,
        retrieving: false,
        error: action.payload,
      };
    }

    default: return state;
  }
};

export default EventsReducers;
