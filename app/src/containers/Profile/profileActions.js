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
      .get(`${API.URL}/api/user/${userId}`)
      .end((error, res) => {
        !error &&
          dispatch({
            type: RETRIEVE_PROFILE_SUCCESS,
            payload: res.body
          });
      });
  };
};

export const retrieveProfilerRequest = () => {
  return {
    type: RETRIEVE_PROFILE
  };
};

export const updateProfile = profile => {
  return dispatch => {
    dispatch(updateProfilerRequest());
    const profileId = sessionStorage.getItem('profileId');
    return request()
      .put(`${API.URL}/api/profile/${profileId}`)
      .send(profile)
      .type('json')
      .end((error, res) => {
        !error &&
          dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: res.body
          });
      });
  };
};

export const updateProfilerRequest = () => {
  return {
    type: UPDATE_PROFILE
  };
};
