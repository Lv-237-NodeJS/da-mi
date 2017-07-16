import { API, request } from 'src/helper';

const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

const retrieveProfileSuccess = res => ({
  type: RETRIEVE_PROFILE_SUCCESS,
  payload: res.body
});

const updateProfileSuccess = res => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: res.body
});

export const retrieveProfile = userId => dispatch =>
  request()
    .get(`${API.URL}/api/user/${userId}`)
    .end((error, res) => {
      !error && dispatch(retrieveProfileSuccess(res));
    });

export const updateProfile = profile => dispatch => {
  const profileId = sessionStorage.getItem('profileId');
  return request()
    .put(`${API.URL}/api/profile/${profileId}`)
    .send(profile)
    .type('json')
    .end((error, res) => {
      !error && dispatch(updateProfileSuccess(res));
    });
};
