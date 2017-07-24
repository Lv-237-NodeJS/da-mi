import { API, request } from 'src/helper';
import { browserHistory } from 'react-router';

const GET_DONOR_SUCCESS = 'GET_DONOR_SUCCESS';
const GET_DONOR_FAILURE = 'GET_DONOR_FAILURE';
const CREATE_DONOR_SUCCESS = 'CREATE_DONOR_SUCCESS';
const CREATE_DONOR_FAILURE = 'CREATE_DONOR_FAILURE';

const getDonorSuccess = res => {
  return {
    type: GET_DONOR_SUCCESS,
    payload: res.body
  };
};

const getDonorFailure = res => ({
  type: GET_DONOR_FAILURE,
  status: res.statusCode
});

const createDonorSuccess = res => {
  return {
    type: CREATE_DONOR_SUCCESS,
    payload: res.body
  };
};

const createDonorFailure = res => ({
  type: CREATE_DONOR_FAILURE,
  status: res.statusCode
});

export const getDonor = (id, gift_id) => dispatch =>
  request()
    .get(`${API.URL}/api/event/${id}/gift/${gift_id}/donor`)
    .end((err, res) => {
      (err || !res.ok) &&
        dispatch(getDonorFailure(res)) ||
        dispatch(getDonorSuccess(res));
    });

export const createDonor = (id, gift_id) => dispatch =>
  request()
    .post(`${API.URL}/api/event/${id}/gift/${gift_id}/donor`)
    .end((err, res) => {
      (err || !res.ok) &&
        dispatch(createDonorFailure(res)) ||
        dispatch(createDonorSuccess(res));
    });
