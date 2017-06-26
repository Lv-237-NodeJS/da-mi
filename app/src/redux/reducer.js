import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signup from './Signup';
import login from './Login';
import event from './eventReducers';
import eventsList from './EventsReducers';
import invite from './Invite';

export default combineReducers({
  login,
  event,
  eventsList,
  signup,
  invite,
  routing: routerReducer
});
