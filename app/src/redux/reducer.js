import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signup from './signUp';
import login from './login';
import event from './eventReducers';
import profile from './profileReducers';
import eventsList from './eventsReducers';
import invite from './inviteReducers';
import newEvent from './newEventReducers';
import editEvent from './editEventReducers';

export default combineReducers({
  login,
  event,
  profile,
  eventsList,
  signup,
  invite,
  newEvent,
  editEvent,
  routing: routerReducer
});
