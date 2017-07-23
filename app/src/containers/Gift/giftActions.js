import { API, request, messages } from 'src/helper';

const FETCH_GIFTS_SUCCESS = 'FETCH_GIFTS_SUCCESS';
const FETCH_GIFTS_FAIL = 'FETCH_GIFTS_FAIL';
const CREATE_GIFT_SUCCESS = 'CREATE_GIFT_SUCCESS';
const CREATE_GIFT_FAIL = 'CREATE_GIFT_FAIL';
const DELETE_GIFT_SUCCESS = 'DELETE_GIFT_SUCCESS';
const DELETE_GIFT_FAIL = 'DELETE_GIFT_FAIL';
const UPDATE_GIFT_SUCCESS = 'UPDATE_GIFT_SUCCESS';
const UPDATE_GIFT_FAIL = 'UPDATE_GIFT_FAIL';
const SHOW_ALERT = 'SHOW_ALERT';
const MESSAGE_ALERT = 'MESSAGE_ALERT';
const VIEW_ALERT = 'VIEW_ALERT';

export const showAlert = show => ({
  type: SHOW_ALERT,
  show: show
});

const messageAlert = message => ({
  type: MESSAGE_ALERT,
  message: message
});

const messageView = view => ({
  type: VIEW_ALERT,
  view: view
});

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
  payload: res
});

const updateGiftSuccess = res => ({
  type: UPDATE_GIFT_SUCCESS,
  payload: res
});

const updateGiftFail = err => ({
  type: UPDATE_GIFT_FAIL,
  payload: res
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
    dispatch(messageAlert(JSON.parse(res.text).message));
    dispatch(messageView(JSON.parse(res.text).view));
    dispatch(showAlert(true));
    err && dispatch(createGiftFail(err)) ||
    dispatch(createGiftSuccess(JSON.parse(res.text).gift));
  });

export const updateGift = (eventId, giftId, gift) => dispatch => request()
  .put(`${API.URL}/api/event/${eventId}/gift/${giftId}`)
  .send(gift)
  .end((err, res) => {
    dispatch(messageAlert(JSON.parse(res.text).message));
    dispatch(messageView(JSON.parse(res.text).view));
    dispatch(showAlert(true));
    err && dispatch(updateGiftFail(err)) ||
    dispatch(updateGiftSuccess(JSON.parse(res.text).gift));
  });

export const deleteGift = (eventId, giftId) => dispatch => request()
  .delete(`${API.URL}/api/event/${eventId}/gift/${giftId}`)
  .end((err, res) => {
    dispatch(messageAlert(JSON.parse(res.text).message));
    dispatch(messageView(JSON.parse(res.text).view));
    dispatch(showAlert(true));
    err && dispatch(deleteGiftFail(err)) ||
    dispatch(deleteGiftSuccess(giftId));
  });
