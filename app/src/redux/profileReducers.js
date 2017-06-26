import request from './../helper/request';
import { API } from './../helper/constants';

const RETRIEVE_PROFILE = 'RETRIEVE_PROFILE';
const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
const RETRIEVE_PROFILE_FAILURE = 'RETRIEVE_PROFILE_FAILURE';

export const retrieveProfile = userId => {

  return dispatch => {
    dispatch(retrieveProfilerRequest());
    return request()
      .get(API.HOST + API.PORT + '/api/user/' + userId)
      .end((error, res) => {
        if (error) {
          dispatch({
            type: RETRIEVE_PROFILE_FAILURE,
            payload: error
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

export const retrieveProfilerRequest = () => {
  return {
    type: RETRIEVE_PROFILE
  };
};

const initialState = {
  data: {},
  error: null
};

export const profileReducers = (state = initialState, action) => {
  switch (action.type) {

    case RETRIEVE_PROFILE: {
      return {
        ...state
      };
    }

    case RETRIEVE_PROFILE_SUCCESS: {
      return {
        ...state,
        data: action.payload
      };
    }

    case RETRIEVE_PROFILE_FAILURE: {
      return {
        ...state
      };
    }

    default: return state;
  }
};

export default profileReducers;
