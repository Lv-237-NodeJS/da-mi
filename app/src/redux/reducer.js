import { combineReducers } from 'redux';
import items from './Test';
import login from './Login'
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  items,
  login,
  routing: routerReducer
});
