import { API, request, messages } from 'src/helper';

const SEND_INVITES = 'SEND_INVITES';
const GET_EMAILS = 'GET_EMAILS';
const DELETE_GUEST = 'DELETE_GUEST';
const SAVE_EMAILS = 'SAVE_EMAILS';
const CHANGE_GUEST_STATUS = 'CHANGE_GUEST_STATUS';
const SHOW_ALERT = 'SHOW_ALERT';
const MESSAGE_ALERT = 'MESSAGE_ALERT';
const VIEW_ALERT = 'VIEW_ALERT';

const getGuests = (err, text) => (!err && JSON.parse(text).guests);

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
      dispatch(messageAlert(JSON.parse(res.text).message));
      dispatch(messageView(JSON.parse(res.text).view));
      dispatch(showAlert(true));
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
      dispatch(messageAlert(messages.deleteGuest));
      dispatch(messageView(messages.success));
      dispatch(showAlert(true));
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
        guests && dispatch(emailsSave(JSON.parse(res.text).guests));
        dispatch(messageAlert(JSON.parse(res.text).message));
        dispatch(messageView(JSON.parse(res.text).view));
        dispatch(showAlert(true));
      });
  };
};

export const changeGuestStatus = (status, eventId) => dispatch =>
  request()
    .put(`${API.URL}/api/event/${eventId}/guest/status`)
    .send({status})
    .end();
