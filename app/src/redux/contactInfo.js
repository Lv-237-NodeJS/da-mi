import { messages, request, API } from 'src/helper';

const SHOW_MODAL = 'SHOW_MODAL';
const CONTACT_REQUEST = 'CONTACT_REQUEST';
const MESSAGE_MODAL = 'MESSAGE_MODAL';

export default function changeReducer(state = {show: false, message: ''}, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {show: action.show});
    case MESSAGE_MODAL:
      return Object.assign({}, state, {message: action.message});
    default:
      return state;
  }
}

export function showModal(show) {
  return {
    type: SHOW_MODAL,
    show: show
  };
}

export function messageModal(message) {
  return {
    type: MESSAGE_MODAL,
    message: message
  };
}

export function contactRequest() {
  return {type: CONTACT_REQUEST};
}

export function contactInfo({name, surname, email, textarea}) {
  let data = {name, surname, email, textarea};
  
  return dispatch => {
    dispatch(contactRequest());
    request()
      .post(`${API.URL}/api/support`)
      .send(data)
      .end((err, res) => {
        (res.status == 200) && dispatch(messageModal(res.text)) &&
        dispatch(showModal(true)) || dispatch(messageModal(err.response.text)) &&
        dispatch(showModal(true));
      });
  };
}
