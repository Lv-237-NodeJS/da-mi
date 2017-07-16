import  { API, request }  from 'src/helper';

const RETRIEVE_EVENTS_SUCCESS = 'RETRIEVE_EVENTS_SUCCESS';

const retrieveEventsSuccess = res => ({
  type: RETRIEVE_EVENTS_SUCCESS,
  payload: res.body,
});

export const retrieveEvents = () => dispatch =>
  request()
    .get(`${API.URL}/api/events`)
    .end((err, res) => {
      !err && dispatch(retrieveEventsSuccess(res));
    });
