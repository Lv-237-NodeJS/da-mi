import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';
import eventsList from './EventsReducers';
import event from './eventReducers';

export default combineReducers({
  items,
  login,
  eventsList,
  event,
  routing: routerReducer
});
