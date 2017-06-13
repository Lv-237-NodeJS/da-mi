import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';
import profile from './ProfileReducers';

export default combineReducers({
  items,
  profile,
  login,
  routing: routerReducer
});
