import { combineReducers } from 'redux';
import items from './Test';
import signup from './Signup';
import { routerReducer } from 'react-router-redux';
import login from './Login';
import event from './eventReducers';
import eventsList from './EventsReducers';

export default combineReducers({
  login,
  event,
  eventsList,
  signup,
  routing: routerReducer
});
