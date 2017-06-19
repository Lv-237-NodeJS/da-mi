import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './Login';
import event from './eventReducers';
import eventsList from './EventsReducers';

export default combineReducers({
  login,
  event,
  eventsList,
  routing: routerReducer
});
