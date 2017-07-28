import { API, request, messages } from 'src/helper';
import { showResponseMessage } from 'src/components/Alerts/AlertsActions';

const FETCH_GIFTS_SUCCESS = 'FETCH_GIFTS_SUCCESS';
const FETCH_GIFTS_FAIL = 'FETCH_GIFTS_FAIL';
const CREATE_GIFT_SUCCESS = 'CREATE_GIFT_SUCCESS';
const CREATE_GIFT_FAIL = 'CREATE_GIFT_FAIL';
const DELETE_GIFT_SUCCESS = 'DELETE_GIFT_SUCCESS';
const DELETE_GIFT_FAIL = 'DELETE_GIFT_FAIL';
const UPDATE_GIFT_SUCCESS = 'UPDATE_GIFT_SUCCESS';
const UPDATE_GIFT_FAIL = 'UPDATE_GIFT_FAIL';

const fetchGiftsSuccess = res => ({
  type: FETCH_GIFTS_SUCCESS,
  payload: res.body
});

const fetchGiftsFail = err => ({
  type: FETCH_GIFTS_FAIL,
  payload: err.response.body.message
});

const createGiftSuccess = res => ({
  type: CREATE_GIFT_SUCCESS,
  payload: res
});

const createGiftFail = err => ({
  type: CREATE_GIFT_FAIL,
  payload: err
});

const updateGiftSuccess = res => ({
  type: UPDATE_GIFT_SUCCESS,
  payload: res
});

const updateGiftFail = err => ({
  type: UPDATE_GIFT_FAIL,
  payload: err
});

const deleteGiftSuccess = giftId => ({
  type: DELETE_GIFT_SUCCESS,
  payload: giftId
});

const deleteGiftFail = err => ({
  type: DELETE_GIFT_FAIL,
  payload: err
});

export const fetchGifts = eventId => dispatch => request()
  .get(`${API.URL}/api/events/${eventId}/gifts`)
  .end((err, res) => err &&
    dispatch(fetchGiftsFail(err)) ||
    dispatch(fetchGiftsSuccess(res)));

export const createGift = (eventId, gift) => dispatch => request()
  .post(`${API.URL}/api/events/${eventId}/gifts`)
  .send(gift)
  .end((err, res) => {
    showResponseMessage(dispatch, res);
    err && dispatch(createGiftFail(err)) ||
    dispatch(createGiftSuccess(res.body.gift));
  });

export const updateGift = (eventId, giftId, gift) => dispatch => request()
  .put(`${API.URL}/api/event/${eventId}/gift/${giftId}`)
  .send(gift)
  .end((err, res) => {
    showResponseMessage(dispatch, res);
    err && dispatch(updateGiftFail(err)) ||
    dispatch(updateGiftSuccess(res.body.gift));
  });

export const deleteGift = (eventId, giftId) => dispatch => request()
  .delete(`${API.URL}/api/event/${eventId}/gift/${giftId}`)
  .end((err, res) => {
    showResponseMessage(dispatch, res);
    err && dispatch(deleteGiftFail(err)) ||
    dispatch(deleteGiftSuccess(giftId));
  });
