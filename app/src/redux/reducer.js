import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signup from './Signup';
import login from './Login';
import event from './eventReducers';
import profile from './ProfileReducers';
import eventsList from './EventsReducers';

export default combineReducers({
  login,
  event,
  profile,
  eventsList,
  signup,
  routing: routerReducer
});
