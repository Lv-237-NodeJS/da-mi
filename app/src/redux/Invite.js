import request from './../helper/request';
import { API } from './../helper/constants';

const SEND_INVITE_REQUEST = 'SEND_INVITE_REQUEST';
const GET_EMAILS_REQUEST = 'GET_EMAILS_REQUEST';
const GET_EMAILS_SUCCESS = 'GET_EMAILS_SUCCESS';
const DELETE_GUEST_REQUEST = 'DELETE_GUEST_REQUEST';
const DELETE_GUEST_SUCCESS = 'DELETE_GUEST_SUCCESS';

export default function inviteReducer(state = {guests: []}, action) {
  switch (action.type) {
    case GET_EMAILS_SUCCESS:
      return {
        guests: [...action.guests]
      };
    case DELETE_GUEST_SUCCESS:
      return {
        guests: state.guests.filter(guest => guest.user_id !== action.userId)
      };
    default:
      return state;
  }
}

export function sendInvitesRequest() {
  return {
    type: SEND_INVITE_REQUEST,
  };
}

export function getEmailsRequest() {
  return {
    type: GET_EMAILS_REQUEST
  };
}

export function getEmailsSuccess(guests) {
  return {
    type: GET_EMAILS_SUCCESS,
    guests: guests
  };
}

export function deleteGuestReguest() {
  return {
    type: DELETE_GUEST_REQUEST
  };
}

export function deleteGuestSuccess(userId) {
  return {
    type: DELETE_GUEST_SUCCESS,
    userId: userId
  };
}

export function sendInvites() {
  const eventId = location.pathname.split('/')[2];
  return dispatch => {
    dispatch(sendInvitesRequest());
    request()
      .post(API.HOST + API.PORT + `/api/event/${eventId}/guest/invite`)
      .end();
  };
}

export function getEmails() {
  const eventId = location.pathname.split('/')[2];
  return dispatch => {
    dispatch(getEmailsRequest());
    request()
      .get(API.HOST + API.PORT + `/api/event/${eventId}/guest/get`)
      .end((err, res) => {
        res &&
        dispatch(getEmailsSuccess(JSON.parse(res.text).guests));
      });
  };
}

export function deleteGuest(guest) {
  const userId = guest.user_id;
  return dispatch => {
    dispatch(deleteGuestReguest());
    request()
      .delete(API.HOST + API.PORT + `/api/user/${userId}`)
      .end((err, res) => {
        res &&
        dispatch(deleteGuestSuccess(userId));
      });
  };
}
