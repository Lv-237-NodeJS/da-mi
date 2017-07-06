const FETCH_GIFT_SUCCESS = 'FETCH_GIFT_SUCCESS';
const FETCH_GIFT_FAIL = 'FETCH_GIFT_FAIL';
const FETCH_GIFTS_SUCCESS = 'FETCH_GIFTS_SUCCESS';
const FETCH_GIFTS_FAIL = 'FETCH_GIFTS_FAIL';
const CREATE_GIFT_SUCCESS = 'CREATE_GIFT_SUCCESS';
const CREATE_GIFT_FAIL = 'CREATE_GIFT_FAIL';
const DELETE_GIFT_SUCCESS = 'DELETE_GIFT_SUCCESS';
const DELETE_GIFT_FAIL = 'DELETE_GIFT_FAIL';
const UPDATE_GIFT_SUCCESS = 'UPDATE_GIFT_SUCCESS';
const UPDATE_GIFT_FAIL = 'UPDATE_GIFT_FAIL';

import { API } from './../helper/constants';
import request from './../helper/request';

export const fetchGift = (giftId, eventId) => {
  return dispatch => {
    return request()
      .get(API.URL + `/api/event/${eventId}/gift/${giftId}`)
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

export const fetchGifts = eventId => {
  return dispatch => {
    return request()
      .get(API.URL + `/api/events/${eventId}/gifts`)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: FETCH_GIFTS_FAIL,
            payload: err,
          });
        } else {
          dispatch({
            type: FETCH_GIFTS_SUCCESS,
            payload: res.body,
          });
        }
      });
  };
};

export const createGift = (eventId, gift) => {
  return dispatch => {
    return request()
      .post(API.URL + `/api/events/${eventId}/gifts`)
      .send(gift)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: CREATE_GIFT_FAIL
          });
        } else {
          dispatch({
            type: CREATE_GIFT_SUCCESS,
            payload: res.body,
          });
        }
      });
  };
};

export const updateGift = (eventId, giftId) => {
  return dispatch => {
    return request()
      .put(API.URL + `/api/event/${eventId}/gifts/${giftId}`)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: UPDATE_GIFT_FAIL
          });
        } else {
          dispatch({
            type: UPDATE_GIFT_SUCCESS,
            payload: res.body,
          });
        }
      });
  };
};

export const deleteGift = (eventId, giftId) => {
  return dispatch => {
    return request()
      .delete(API.HOST + API.PORT + '/api/event/' + eventId + '/gift/' + giftId)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: DELETE_GIFT_FAIL
          });
        } else {
          dispatch({
            type: DELETE_GIFT_SUCCESS,
            payload: res.body,
          });
        }
      });
  };
};

const initialState = {
  giftsList: {gifts: [], error: null},
  newGift: {gift: null, error: null},
  activeGift: {gift: null, error: null},
  updatedGift: {gift: null, error: null},
  deletedGift: {gift: null, error: null},
};

const giftReducer = (state = initialState, action) => {
  let error;
  switch (action.type) {
    case FETCH_GIFT_SUCCESS: {
      return {...state, activeGift: {gift: action.payload, error: null}};
    }
    case FETCH_GIFT_FAIL: {
      error = action.payload;
      return {...state, activeGift: {gift: null, error: error}};
    }
    case FETCH_GIFTS_SUCCESS: {
      return {...state, giftsList: {gifts: action.payload, error: null}};
    }
    case FETCH_GIFTS_FAIL: {
      error = action.payload;
      return {...state, giftsList: {gifts: [], error: error}};
    }
    case CREATE_GIFT_SUCCESS: {
      return {...state, newGift: {gift: action.payload, error: null}};
    }
    case CREATE_GIFT_FAIL: {
      error = action.payload;
      return {...state, newGift: {gift: null, error: error}};
    }
    case UPDATE_GIFT_SUCCESS: {
      return {...state, updatedGift: {gift: action.payload, error: null}};
    }
    case UPDATE_GIFT_FAIL: {
      error = action.payload;
      return {...state, updatedGift: {gift: null, error: error}};
    }
    case DELETE_GIFT_SUCCESS: {
      return {...state, deletedGift: {gift: action.payload, error: null}};
    }
    case DELETE_GIFT_FAIL: {
      return {...state, deletedGift: {gift: null, error: error}};
    }
    default: return state;
  }
};

export default giftReducer;
