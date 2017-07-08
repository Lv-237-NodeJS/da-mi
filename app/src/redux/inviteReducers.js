import request from 'src/helper/request';
import { API } from 'src/helper/constants';

const SEND_INVITES = 'SEND_INVITES';
const GET_EMAILS = 'GET_EMAILS';
const DELETE_GUEST = 'DELETE_GUEST';
const SAVE_EMAILS = 'SAVE_EMAILS';
const getGuests = (err, text) => (!err && JSON.parse(text).guests);

export default function inviteReducer(state = {guests: []}, action) {
  switch (action.type) {
    case GET_EMAILS:
      return {
        guests: [...action.guests]
      };
    case DELETE_GUEST:
      return {
        guests: state.guests.filter(guest => guest.id !== action.id)
      };
    case SAVE_EMAILS:
      return {
        ...state,
        guests: [...state.guests, ...action.guests]
      };
    default:
      return state;
  }
}

export function sendInvites(eventId, owner) {
  return dispatch => {
    request()
      .post(API.URL + `/api/event/${eventId}/guest/invite`)
      .send({owner})
      .end((err, res) => {
        !err &&
          dispatch({
            type: SEND_INVITES
          });
      });
  };
}

export function getEmails(eventId) {
  return dispatch => {
    request()
      .get(API.URL + `/api/event/${eventId}/guests`)
      .end((err, res) => {
        const guests = getGuests(err, res.text);
        let id;
        let email;
        guests &&
          dispatch({
            type: GET_EMAILS,
            guests: guests.map(guest => ({id, email} = guest.User))
          });
      });
  };
}

export function deleteGuest(eventId, userId) {
  return dispatch => {
    request()
      .delete(API.URL + `/api/event/${eventId}/guest/${userId}`)
      .end((err, res) => {
        !err &&
          dispatch({
            type: DELETE_GUEST,
            id: userId
          });
      });
  };
}

export function saveEmails(emails, eventId) {
  const data = {emails, eventId};
  return dispatch => {
    request()
      .post(API.URL + `/api/event/${eventId}/guests`)
      .send(data)
      .end((err, res) => {
        const guests = getGuests(err, res.text);
        guests &&
          dispatch({
            type: SAVE_EMAILS,
            guests
          });
      });
  };
}
