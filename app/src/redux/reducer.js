import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';
import { eventsReducer, eventReducer } from './reducers/EventReducer';

export default combineReducers({
  items,
  login,
  routing: routerReducer
  events: eventsReducer,
  event: eventReducer,
});
