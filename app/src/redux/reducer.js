import { combineReducers } from 'redux';
import items from './Test';
import { eventsReducer, eventReducer } from './reducers/EventReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  items,
  events: eventsReducer,
  event: eventReducer,
  routing: routerReducer,
});
