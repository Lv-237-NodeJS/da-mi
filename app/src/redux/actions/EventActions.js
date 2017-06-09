
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
const FETCH_EVENT_BY_ID_SUCCESS = 'FETCH_EVENT_BY_ID_SUCCESS';
const apiUrl = 'http://52.59.166.205:8082/api/events';

import request from 'superagent';

export const fetchEventsSuccess = (events) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    events,
  };
};

export const fetchEventByIdSuccess = (event) => {
  return {
    type: FETCH_EVENT_BY_ID_SUCCESS,
    event,
  };
};

export const fetchEvents = () => {
  return (dispatch) => {
    return request.get(apiUrl)
      .then(response => {
        dispatch(fetchEventsSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchEventById = (eventId) => {
  return (dispatch) => {
    return request.get(apiUrl + '/' + eventId)
      .then(response => {

        dispatch(fetchEventByIdSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};
