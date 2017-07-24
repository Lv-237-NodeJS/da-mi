import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import event from 'src/containers/Event/eventReducer';
import profile from 'src/containers/Profile/profileReducer';
import eventsList from 'src/containers/Events/eventsListReducer';
import invite from 'src/containers/Event/inviteReducer';
import newEvent from 'src/containers/NewEvent/newEventReducer';
import gift from 'src/containers/Gift/giftReducer';
import login from 'src/components/Login/loginReducer';
import editEvent from 'src/components/EventsModalForm/editEventReducer';
import deleteEvent from 'src/components/DeleteEventModal/deleteEventReducer';
import fileUploader from 'src/components/FileUploader/fileUploaderReducer';
import comments from 'src/containers/Comments/commentReducer';
import alerts from 'src/components/Alerts/AlertsReducer';

const initialState = {
  gifts: [],
  events: [],
  myInvitations: [],
  guests: [],
  data: {},
  current: {},
  updatedEvent: {},
  message: '',
  illegalInput: true,
  show: false,
  isUpdated: false,
  isCreated: false,
  isDeleted: false,
  comments: [],
  error: null,
  fileUrl: '',
  guestStatus: null
};

const resolve = reducerFunctions => (state = initialState, action) => {
  const reducer = reducerFunctions[action.type];
  return reducer ? reducer(state, action) : state;
};

export default combineReducers({
  login: resolve(login),
  event: resolve(event),
  profile: resolve(profile),
  eventsList: resolve(eventsList),
  invite: resolve(invite),
  newEvent: resolve(newEvent),
  editEvent: resolve(editEvent),
  gift: resolve(gift),
  deleteEvent: resolve(deleteEvent),
  fileUploader: resolve(fileUploader),
  comments: resolve(comments),
  alerts: resolve(alerts),
  routing: routerReducer
});
