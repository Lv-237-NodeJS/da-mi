import { API, request } from 'src/helper';

const SEND_INVITES = 'SEND_INVITES';
const GET_EMAILS = 'GET_EMAILS';
const DELETE_GUEST = 'DELETE_GUEST';
const SAVE_EMAILS = 'SAVE_EMAILS';

const getGuests = (err, text) => (!err && JSON.parse(text).guests);

const invites = () => ({
  type: SEND_INVITES
});

const emails = (guests, id, email) => ({
  type: GET_EMAILS,
  guests: guests.map(guest => ({id, email} = guest.User))
});

const guestDelete = userId => ({
  type: DELETE_GUEST,
  id: userId
});

const emailsSave = guests => ({
  type: SAVE_EMAILS,
  guests
});

export const sendInvites = (eventId, owner) => dispatch =>
  request()
    .post(`${API.URL}/api/event/${eventId}/guest/invite`)
    .send({owner})
    .end((err, res) => {
      !err && dispatch(invites());
    });

export const getEmails = eventId => dispatch =>
  request()
    .get(`${API.URL}/api/event/${eventId}/guests`)
    .end((err, res) => {
      const guests = getGuests(err, res.text);
      let id;
      let email;
      guests && dispatch(emails(guests, id, email));
    });

export const deleteGuest = (eventId, userId) => dispatch =>
  request()
    .delete(`${API.URL}/api/event/${eventId}/guest/${userId}`)
    .end((err, res) => {
      !err && dispatch(guestDelete(userId));
    });

export const saveEmails = (emails, eventId) => {
  const data = {emails, eventId};
  return dispatch => {
    request()
      .post(`${API.URL}/api/event/${eventId}/guests`)
      .send(data)
      .end((err, res) => {
        const guests = getGuests(err, res.text);
        guests && dispatch(emailsSave(guests));
      });
  };
};
