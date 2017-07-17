import  { API, request }  from 'src/helper';

const RETRIEVE_EVENTS_SUCCESS = 'RETRIEVE_EVENTS_SUCCESS';

const retrieveEventsSuccess = (res, invitations) => ({
  type: RETRIEVE_EVENTS_SUCCESS,
  myEvents: res.body.myEvents,
  myInvitations: invitations
});

export const retrieveEvents = () => dispatch =>
  request()
    .get(`${API.URL}/api/events`)
    .end((err, res) => {
      const invitations = res.body.myInvitations.map(invitation => invitation.Event);
      !err && dispatch(retrieveEventsSuccess(res, invitations));
    });
