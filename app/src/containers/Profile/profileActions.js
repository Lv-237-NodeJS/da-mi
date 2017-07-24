import { API, request } from 'src/helper';
import {SHOW_ALERT, MESSAGE_ALERT, VIEW_ALERT,
  showAlert, messageAlert, messageView } from 'src/components/Alerts/AlertsActions';

const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

const retrieveProfileSuccess = res => ({
  type: RETRIEVE_PROFILE_SUCCESS,
  payload: res.body
});

const updateProfileSuccess = res => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: res
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
      dispatch(messageAlert(JSON.parse(res.text).message));
      dispatch(messageView(JSON.parse(res.text).view));
      dispatch(showAlert(true));
      !error && dispatch(updateProfileSuccess(JSON.parse(res.text).profile));     
    });
};
