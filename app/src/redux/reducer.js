import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';
import events from './EventsReducers';

export default combineReducers({
  items,
  login,
  events,
  routing: routerReducer
});
