import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signup from './signUp';
import login from './login';
import event from './eventReducers';
import profile from './profileReducers';
import eventsList from './eventsReducers';
import invite from './invite';
import newevent from './newEventReducers';


export default combineReducers({
  login,
  event,
  profile,
  eventsList,
  signup,
  invite,
  newevent,
  routing: routerReducer
});
