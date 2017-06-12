import request from 'superagent';
import { push } from 'react-router-redux';
import { API } from './../helper/constants';

const RETRIEVE_PROFILE_REQUESTED = 'RETRIEVE_PROFILE_REQUESTED';
const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
const RETRIEVE_PROFILE_FAILURE = 'RETRIEVE_PROFILE_FAILURE';

export default function retrieveProfile(state = {
    profle: {},
    retrieving: false,
    retrieved: false,
    error: null
  }, action) {
  switch (action.type) {
  case RETRIEVE_PROFILE_REQUESTED:
    return {
        ...state, retrieving: true
      };
  case RETRIEVE_PROFILE_FAILURE:
    return {
        ...state,
        retrieving: false,
        error: action.payload
      };
  case RETRIEVE_PROFILE_SUCCESS:
    return {
        ...state,
        retrieving: false,
        retrieved: true,
        profile: action.payload
      };
  default:
    return state;
}
}

export function retrieveProfile(id) {
  //   sessionStorage.getItem('token', token);
  // let token = sessionStorage.getItem('token')
  return dispatch => {
          request
             .get(API.HOST + API.PORT + '/api/user/1')
             .accept('json')
             //   .set('x-access-token', token)
             .set('Content-Type', 'application/json')
             .then((response) => {
                  dispatch({type: RETRIEVE_PROFILE_SUCCESS, payload: response.data.data});
                })
                .catch((err) => {
                    dispatch({type: RETRIEVE_PROFILE_FAILURE, payload: err});
                  });
        };
}
