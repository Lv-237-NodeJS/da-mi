<<<<<<< 32d27be48f03199280dc432a6e5eeff863fd252e
const FETCH_EVENT_BY_ID = 'FETCH_EVENT_BY_ID';
const FETCH_EVENT_BY_ID_FULFILLED = 'FETCH_EVENT_BY_ID_FULFILLED';
const FETCH_EVENT_BY_ID_REJECTED = 'FETCH_EVENT_BY_ID_REJECTED';
import { API } from './../helper/constants';
import request from './../helper/request';

export const fetchEventById = eventId => {
  return dispatch => {
    return request
    .get(API.HOST + API.PORT + '/api/events/' + eventId)
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
      return { ...state, fetching: true };
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

    default: return state;
  }
};

export default eventReducers;
=======
const FETCH_EVENTS = 'FETCH_EVENTS';
const FETCH_EVENTS_FULFILLED = 'FETCH_EVENTS_FULFILLED';
const FETCH_EVENTS_REJECTED = 'FETCH_EVENTS_REJECTED';

// const FETCH_EVENT_BY_ID_SUCCESS = 'FETCH_EVENT_BY_ID_SUCCESS';
//const apiUrl = 'https://jsonplaceholder.typicode.com/users';

const apiUrl = 'http://localhost:8082/api/events';

//import axios from "axios";
import request from "superagent";

export function fetchEvents(){
  return function(dispatch){
    request
    .get(apiUrl)
    .end(function(err, res){
      if(err){
        dispatch({
          type: FETCH_EVENTS_REJECTED,
          payload: err 
          })
      } else {
        //console.log('From superAgenta: ', res.body);      
        dispatch({ 
          type: FETCH_EVENTS_FULFILLED, 
          payload: res.body
        });
      }      
    })
  }
}

export default function reducer(state={
  events:[],
  fetching: false,
  fetched: false,
  error: null
}, action){
  switch (action.type) {
    case FETCH_EVENTS: {
      return {...state, fetching: true}
    }
    case FETCH_EVENTS_FULFILLED:{
      //console.log('from reducer ----: ', action.payload);
      return {
              ...state,
              fetching: false,
              fetched: true,
              events: action.payload
              }
    }
     case FETCH_EVENTS_REJECTED: {
       return {
                ...state,
                fetching: false,
                error: action.payload
              }
     }

  }
  return state;
}
>>>>>>> Modified EventDetails component
