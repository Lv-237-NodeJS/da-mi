import  { API, request }  from 'src/helper';

const RETRIEVE_EVENTS = 'RETRIEVE_EVENTS';
const RETRIEVE_EVENTS_SUCCESS = 'RETRIEVE_EVENTS_SUCCESS';
const RETRIEVE_EVENTS_FAILURE = 'RETRIEVE_EVENTS_FAILURE';

export const retrieveEvents = () => {

  return dispatch => {
    dispatch(retrieveEventsRequest());
    return request()
      .get(API.HOST + API.PORT + '/api/events')
      .end((err, res) => {
        if (err) {
          dispatch({
            type: RETRIEVE_EVENTS_FAILURE
          });
        } else {
          dispatch({
            type: RETRIEVE_EVENTS_SUCCESS,
            payload: res.body,
          });
        }
      });
  };
};

export const retrieveEventsRequest = () => {
  return {
    type: RETRIEVE_EVENTS
  };
};

const initialState = {
  events: []
};

export const EventsReducers = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_EVENTS: {
      return {
        ...state
      };
    }

    case RETRIEVE_EVENTS_SUCCESS: {
      return {
        ...state,
        events: action.payload
      };
    }

    case RETRIEVE_EVENTS_FAILURE: {
      return {
        ...state
      };
    }
    
    default: return state;
  }
};

export default EventsReducers;
