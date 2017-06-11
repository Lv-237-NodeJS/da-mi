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
