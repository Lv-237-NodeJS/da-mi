import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signup from 'src/containers/Signup/signupReducer';
import event from 'src/containers/Event/eventReducer';
import profile from 'src/containers/Profile/profileReducer';
import eventsList from 'src/containers/Events/eventsListReducer';
import invite from 'src/containers/Event/inviteReducer';
import newEvent from 'src/containers/NewEvent/newEventReducer';
import contactInfo from 'src/containers/Contacts/contactReducer';
import gift from 'src/containers/Gift/giftReducer';
import login from 'src/components/Login/loginReducer';
import editEvent from 'src/components/EventsModalForm/editEventReducer';

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
  error: null,
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
  signup: resolve(signup),
  invite: resolve(invite),
  newEvent: resolve(newEvent),
  editEvent: resolve(editEvent),
  contactInfo: resolve(contactInfo),
  gift: resolve(gift),
  routing: routerReducer
});
