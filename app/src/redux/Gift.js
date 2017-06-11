const FETCH_GIFT = 'FETCH_GIFT';
const FETCH_GIFT_SUCCESS = 'FETCH_GIFT_SUCCESS';
const FETCH_GIFT_FAIL = 'FETCH_GIFT_FAIL';
const FETCH_GIFTS = 'FETCH_GIFTS';
const FETCH_GIFTS_SUCCESS = 'FETCH_GIFTS_SUCCESS';
const FETCH_GIFTS_FAIL = 'FETCH_GIFTS_FAIL';
const CREATE_GIFT = 'CREATE_GIFT';
const CREATE_GIFT_SUCCESS = 'CREATE_GIFT_SUCCESS';
const CREATE_GIFT_FAIL = 'CREATE_GIFT_FAIL';
const DELETE_GIFT = 'DELETE_GIFT';
const DELETE_GIFT_SUCCESS = 'DELETE_GIFT_SUCCESS';
const DELETE_GIFT_FAIL = 'DELETE_GIFT_FAIL';
const UPDATE_GIFT = 'UPDATE_GIFT';
const UPDATE_GIFT_SUCCESS = 'UPDATE_GIFT_SUCCESS';
const UPDATE_GIFT_FAIL = 'UPDATE_GIFT_FAIL';

import { API } from './../helper/constants';
import request from './../helper/request';

export const fetchGift = (giftId, eventId) => {
  return dispatch => {
    return request()
      .get(API.HOST + API.PORT + '/api/event/' + eventId + '/gift/' + giftId)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: FETCH_GIFT_FAIL,
            payload: err,
          });
        } else {
          dispatch({
            type: FETCH_GIFT_SUCCESS,
            payload: res.body,
          });
        }
      });
  };
};

export const fetchGifts = (eventId) => {
  return dispatch => {
    return request()
      .get(API.HOST + API.PORT + '/api/events' + eventId + '/gifts')
      .end((err, res) => {
        if (err) {
          dispatch({
            type: FETCH_GIFTS_SUCCESS
          });
        } else {
          dispatch({
            type: FETCH_GIFTS_FAIL,
            payload: res.body,
          });
        }
      });
  };
};

export const createGift = (eventId) => {
  return dispatch => {
    return request()
      .post(API.HOST + API.PORT + '/api/events' + eventId + '/gifts')
      .end((err, res) => {
        if (err) {
          dispatch({
            type: CREATE_GIFT_SUCCESS
          });
        } else {
          dispatch({
            type: CREATE_GIFT_FAIL,
            payload: res.body,
          });
        }
      });
  };
};

export const updateGift = (eventId, giftId) => {
  return dispatch => {
    return request()
      .put(API.HOST + API.PORT + '/api/event' + eventId + '/gifts/' + giftId)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: UPDATE_GIFT_SUCCESS
          });
        } else {
          dispatch({
            type: UPDATE_GIFT_FAIL,
            payload: res.body,
          });
        }
      });
  };
};

export const deleteGift = (eventId, giftId) => {
  return dispatch => {
    return request()
      .delete(API.HOST + API.PORT + '/api/event' + eventId + '/gift/' + giftId)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: DELETE_GIFT_SUCCESS
          });
        } else {
          dispatch({
            type: DELETE_GIFT_FAIL,
            payload: res.body,
          });
        }
      });
  };
};



const initialState = {
  current: {},
  fetching: false,
  fetched: false,
  error: null,
};

const giftReducer = (state = initialState, action) => {
  switch (action.type) { 
    case FETCH_GIFT: {
      return { ...state, fetching: true };
    }

    case FETCH_GIFT_SUCCESS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        current: action.payload,
      };
    }

    case FETCH_GIFT_FAIL: {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }

    default: return state;
  }
};

export default giftReducer;
