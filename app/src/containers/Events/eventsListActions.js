import  { API, request }  from 'src/helper';

const RETRIEVE_EVENTS = 'RETRIEVE_EVENTS';
const RETRIEVE_EVENTS_SUCCESS = 'RETRIEVE_EVENTS_SUCCESS';
const RETRIEVE_EVENTS_FAILURE = 'RETRIEVE_EVENTS_FAILURE';

export const retrieveEvents = () => {
  return dispatch => {
    dispatch(retrieveEventsRequest());
    return request()
      .get(`${API.URL}/api/events`)
      .end((error, res) => {
        !error &&
          dispatch({
            type: RETRIEVE_EVENTS_SUCCESS,
            payload: res.body,
          });
      });
  };
};

export const retrieveEventsRequest = () => {
  return {
    type: RETRIEVE_EVENTS
  };
};
