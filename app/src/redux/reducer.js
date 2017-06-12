import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';

export default combineReducers({
  items,
  login,
  routing: routerReducer
});
