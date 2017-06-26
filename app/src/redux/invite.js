import request from './../helper/request';
import { API } from './../helper/constants';

const SEND_INVITES = 'SEND_INVITES';
const GET_EMAILS = 'GET_EMAILS';
const DELETE_GUEST = 'DELETE_GUEST';

export default function inviteReducer(state = {guests: []}, action) {
  switch (action.type) {
    case GET_EMAILS:
      return {
        guests: [...action.guests]
      };
    case DELETE_GUEST:
      return {
        guests: state.guests.filter(guest => guest.user_id !== action.userId)
      };
    default:
      return state;
  }
}

export function sendInvites() {
  const eventId = location.pathname.split('/')[2];
  return dispatch => {
    request()
      .post(API.HOST + API.PORT + `/api/event/${eventId}/guest/invite`)
      .end((err, res) => {
        res &&
        dispatch({
          type: SEND_INVITES
        });
      });
  };
}

export function getEmails() {
  const eventId = location.pathname.split('/')[2];
  return dispatch => {
    request()
      .get(API.HOST + API.PORT + `/api/event/${eventId}/guest/get`)
      .end((err, res) => {
        res &&
        dispatch({
          type: GET_EMAILS,
          guests: JSON.parse(res.text).guests
        });
      });
  };
}

export function deleteGuest(guest) {
  const userId = guest.user_id;
  return dispatch => {
    request()
      .delete(API.HOST + API.PORT + `/api/user/${userId}`)
      .end((err, res) => {
        res &&
        dispatch({
          type: DELETE_GUEST,
          userId: userId
        });
      });
  };
}
