import { API, request } from 'src/helper';
import { SHOW_ALERT, MESSAGE_ALERT, VIEW_ALERT, showAlert,
  messageAlert, messageView, showResponseMessage } from 'src/components/Alerts/AlertsActions';

const SEND_INVITES = 'SEND_INVITES';
const GET_EMAILS = 'GET_EMAILS';
const DELETE_GUEST = 'DELETE_GUEST';
const SAVE_EMAILS = 'SAVE_EMAILS';
const CHANGE_GUEST_STATUS = 'CHANGE_GUEST_STATUS';

const getGuests = (err, res) => (!err && res.body.guests);

const invites = () => ({
  type: SEND_INVITES
});

const emails = guests => ({
  type: GET_EMAILS,
  guests: guests.map(guest => {
    const {User: {id}, User: {email}, status} = guest;
    return {id, email, status};
  })
});

const guestDelete = userId => ({
  type: DELETE_GUEST,
  id: userId
});

const emailsSave = guests => ({
  type: SAVE_EMAILS,
  guests: guests.map(guest => ({...guest, status: 'undecided'}))
});

export const sendInvites = (eventId, owner) => dispatch =>
  request()
    .post(`${API.URL}/api/event/${eventId}/guest/invite`)
    .send({owner})
    .end((err, res) => {
      showResponseMessage(dispatch, res);
      !err && dispatch(invites());
    });

export const getGuestsList = eventId => dispatch =>
  request()
    .get(`${API.URL}/api/event/${eventId}/guests`)
    .end((err, res) => {
      const guests = getGuests(err, res);
      guests && dispatch(emails(guests));
    });

export const deleteGuest = (eventId, userId) => dispatch =>
  request()
    .delete(`${API.URL}/api/event/${eventId}/guest/${userId}`)
    .end((err, res) => {
      showResponseMessage(dispatch, res);
      !err && dispatch(guestDelete(userId));
    });

export const saveEmails = (emails, eventId) => {
  const data = {emails, eventId};
  return dispatch => {
    request()
      .post(`${API.URL}/api/event/${eventId}/guests`)
      .send(data)
      .end((err, res) => {
        const guests = getGuests(err, res);
        guests && dispatch(emailsSave(res.body.guests));
        showResponseMessage(dispatch, res);
      });
  };
};

export const changeGuestStatus = (status, eventId) => dispatch =>
  request()
    .put(`${API.URL}/api/event/${eventId}/guest/status`)
    .send({status})
    .end();
