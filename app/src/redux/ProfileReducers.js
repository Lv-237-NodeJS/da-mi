import request from './../helper/request';
import { API } from './../helper/constants';

const RETRIEVE_PROFILE = 'RETRIEVE_PROFILE';
const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
const RETRIEVE_PROFILE_FAILURE = 'RETRIEVE_PROFILE_FAILURE';


export const retrieveProfile = (userId) => {
  return (dispatch) => {
    return request
      .get(API.HOST + API.PORT + '/api/user/' + userId)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: RETRIEVE_PROFILE_FAILURE,
            payload: err,
          });
        } else {
          dispatch({
            type: RETRIEVE_PROFILE_SUCCESS,
            payload: res.body
          });
        }
      });
  };
};

const initialState = {
  profile: {},
  retrieving: false,
  retrieved: false,
  error: null
};

export const profileReducers = (state = initialState, action) => {
  switch (action.type) {

    case RETRIEVE_PROFILE: {
      return {...state, retrieving: true};
    }

    case RETRIEVE_PROFILE_SUCCESS: {
      return {
        ...state,
        retrieving: false,
        retrieved: true,
        profile: action.payload
      };
    }

    case RETRIEVE_PROFILE_FAILURE: {
      return {
        ...state,
        retrieving: false,
        error: action.payload
      };
    }

    default: return state;
  }
};

export default profileReducers;
