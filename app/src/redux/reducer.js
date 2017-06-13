import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';
import event from './eventReducers';

export default combineReducers({
  items,
  login,
  routing: routerReducer
  event,
});
