import { API, request } from 'src/helper';

const RETRIEVE_PROFILE = 'RETRIEVE_PROFILE';
const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

const retrieveProfileRequest = () => ({
  type: RETRIEVE_PROFILE
});

const retrieveProfileSuccess = res => ({
  type: RETRIEVE_PROFILE_SUCCESS,
  payload: res.body
});

const updateProfileRequest = () => ({
  type: UPDATE_PROFILE
});

const updateProfileSuccess = res => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: res.body
});

export const retrieveProfile = userId => dispatch => {
  dispatch(retrieveProfileRequest());
  return request()
    .get(`${API.URL}/api/user/${userId}`)
    .end((error, res) => {
      !error && dispatch(retrieveProfileSuccess(res));
    });
};

export const updateProfile = profile => dispatch => {
  dispatch(updateProfileRequest());
  const profileId = sessionStorage.getItem('profileId');
  return request()
    .put(`${API.URL}/api/profile/${profileId}`)
    .send(profile)
    .type('json')
    .end((error, res) => {
      !error && dispatch(updateProfileSuccess(res));
    });
};
