import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import signup from './Signup';
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
