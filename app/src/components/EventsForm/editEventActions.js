import { API, request } from 'src/helper';
import { showResponseMessage } from 'src/components/Alerts/AlertsActions';

const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

export const editEventSuccess = res => ({
  type: EDIT_EVENT_SUCCESS,
  payload: res
});

export const editEventFailure = res => ({
  type: EDIT_EVENT_FAILURE
});

export const editEvent = (eventId, event) => dispatch =>
  request()
    .put(`${API.URL}/api/event/${eventId}`)
    .send(event)
    .end((err, res) => {
      showResponseMessage(dispatch, res);
      (err || !res.ok) &&
      dispatch(editEventFailure(res.body.error)) ||
      dispatch(editEventSuccess(res.body.event));
    });
