import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';
import event from './eventReducers';
import profile from './ProfileReducers';

export default combineReducers({
  items,
  login,
  event,
  profile,
  routing: routerReducer
});
