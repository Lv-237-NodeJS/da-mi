import { API, request } from 'src/helper';

const FETCH_GIFTS_SUCCESS = 'FETCH_GIFTS_SUCCESS';
const FETCH_GIFTS_FAIL = 'FETCH_GIFTS_FAIL';
const CREATE_GIFT_SUCCESS = 'CREATE_GIFT_SUCCESS';
const CREATE_GIFT_FAIL = 'CREATE_GIFT_FAIL';
const DELETE_GIFT_SUCCESS = 'DELETE_GIFT_SUCCESS';
const DELETE_GIFT_FAIL = 'DELETE_GIFT_FAIL';
const UPDATE_GIFT_SUCCESS = 'UPDATE_GIFT_SUCCESS';
const UPDATE_GIFT_FAIL = 'UPDATE_GIFT_FAIL';

export const fetchGifts = eventId => dispatch => request()
  .get(`${API.URL}/api/events/${eventId}/gifts`)
  .end((err, res) => err &&
    dispatch({
      type: FETCH_GIFTS_FAIL,
      payload: err.response.body.message
    }) ||
    dispatch({
      type: FETCH_GIFTS_SUCCESS,
      payload: res.body
    }));

export const createGift = (eventId, gift) => dispatch => request()
  .post(`${API.URL}/api/events/${eventId}/gifts`)
  .send(gift)
  .end((err, res) => err &&
    dispatch({
      type: CREATE_GIFT_FAIL,
      payload: err.response.body.message
    }) ||
    dispatch({
      type: CREATE_GIFT_SUCCESS,
      payload: res.body
    }));

export const updateGift = (eventId, giftId, gift) => dispatch => request()
  .put(`${API.URL}/api/event/${eventId}/gift/${giftId}`)
  .send(gift)
  .end((err, res) => err &&
    dispatch({
      type: UPDATE_GIFT_FAIL,
      payload: err.response.body.message
    }) ||
    dispatch({
      type: UPDATE_GIFT_SUCCESS,
      payload: res.body
    }));

export const deleteGift = (eventId, giftId) => dispatch => request()
  .delete(`${API.URL}/api/event/${eventId}/gift/${giftId}`)
  .end((err, res) => err &&
    dispatch({
      type: DELETE_GIFT_FAIL,
      payload: err.response.body.message
    }) ||
    dispatch({
      type: DELETE_GIFT_SUCCESS,
      payload: giftId
    }));
