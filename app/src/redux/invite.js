import request from './../helper/request';
import { API } from './../helper/constants';

const SEND_INVITES = 'SEND_INVITES';
const GET_EMAILS = 'GET_EMAILS';
const DELETE_GUEST = 'DELETE_GUEST';
const SAVE_EMAILS = 'SAVE_EMAILS';

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
      .get(API.URL + `/api/event/${eventId}/guest/get`)
      .end((err, res) => {
        let guests;
        !err && (guests = JSON.parse(res.text).guests) &&
          dispatch({
            type: GET_EMAILS,
            guests: guests.map(guest => {
              const {id, email} = guest.User;
              return {id, email};
            })
          });
      });
  };
}

export function deleteGuest(id) {
  return dispatch => {
    request()
      .delete(API.URL + `/api/user/${id}`)
      .end((err, res) => {
        !err &&
          dispatch({
            type: DELETE_GUEST,
            id
          });
      });
  };
}

export function saveEmails(emails, eventId) {
  const data = {emails, eventId};
  return dispatch => {
    request()
      .post(API.HOST + API.PORT + `/api/event/${eventId}/guests`)
      .send(data)
      .end((err, res) => {
        let guests;
        !err && (guests = JSON.parse(res.text).guests) &&
          dispatch({
            type: SAVE_EMAILS,
            guests
          });
      });
  };
}
