import { API, request } from 'src/helper';

const RETRIEVE_PROFILE = 'RETRIEVE_PROFILE';
const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
const RETRIEVE_PROFILE_FAILURE = 'RETRIEVE_PROFILE_FAILURE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

export const retrieveProfile = userId => {
  return dispatch => {
    dispatch(retrieveProfilerRequest());
    return request()
      .get(API.URL + '/api/user/' + userId)
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

export const updateProfile = profile => {
  
  return dispatch => {
    dispatch(updateProfilerRequest());
    const profileId = sessionStorage.getItem('profileId');
    return request()
      .put(API.URL + '/api/profile/' + profileId)
      .send(profile)
      .type('json')
      .end((error, res) => {
        if (error) {
          dispatch({
            type: UPDATE_PROFILE_FAILURE,
            payload: error
          });
        } else {
          dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: res.body
          });
        }
      });
  };
};

export const updateProfilerRequest = () => {
  return {
    type: UPDATE_PROFILE
  };
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

    case UPDATE_PROFILE: {
      return {
        ...state
      };
    }
    
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state
      };
    }

    case UPDATE_PROFILE_FAILURE: {
      return {
        ...state
      };
    }

    default: return state;
  }
};

export default profileReducers;
