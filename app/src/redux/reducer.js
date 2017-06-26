import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signup from './signUp';
import login from './login';
import event from './eventReducers';
import profile from './profileReducers';
import eventsList from './eventsReducers';

export default combineReducers({
  login,
  event,
  profile,
  eventsList,
  signup,
  routing: routerReducer
});
