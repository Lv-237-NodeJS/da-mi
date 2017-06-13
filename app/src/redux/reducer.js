import { combineReducers } from 'redux';
import items from './Test';
import event from './eventReducers';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  event,
  items,
  routing: routerReducer,
});
