import request from '../helper/request';
import { API } from './../helper/constants';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';

const CREATE_NEW_EVENT_SUCCESS = 'CREATE_NEW_EVENT_SUCCESS';
const CREATE_NEW_EVENT_FAILURE = 'CREATE_NEW_EVENT_FAILURE';
const CREATE_NEW_EVENT_REQUEST = 'CREATE_NEW_EVENT_REQUEST';

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

export function createNewEventSuccess() {
  browserHistory.push('/events');
  return {
    type: CREATE_NEW_EVENT_SUCCESS
  };
}

export function createNewEventFailure() {
  return {
    type: CREATE_NEW_EVENT_FAILURE
  };
}

export function createNewEventRequest() {
  return {
    type: CREATE_NEW_EVENT_REQUEST
  };
}

export function createNewEvent(event) {
  return dispatch => {
    dispatch(createNewEventRequest());
    request()
      .post(API.HOST + API.PORT + '/api/events')
      .send(event)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(createNewEventFailure());
        } else {
          dispatch(createNewEventSuccess());
        }
      });
  };
}
