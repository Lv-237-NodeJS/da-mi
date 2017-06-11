import { combineReducers } from 'redux';
import items from './Test';
import eventReducers from './eventReducers';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  items,
  routing: routerReducer,
  events: eventReducers,
});
