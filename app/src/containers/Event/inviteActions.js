import { API, request } from 'src/helper';

const SEND_INVITES = 'SEND_INVITES';
const GET_EMAILS = 'GET_EMAILS';
const DELETE_GUEST = 'DELETE_GUEST';
const SAVE_EMAILS = 'SAVE_EMAILS';

const getGuests = (err, text) => (!err && JSON.parse(text).guests);

export const sendInvites = (eventId, owner) => {
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
};

export const getEmails = eventId => {
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
};

export const deleteGuest = (eventId, userId) => {
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
};

export const saveEmails = (emails, eventId) => {
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
};
