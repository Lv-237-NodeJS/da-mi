import { combineReducers } from 'redux';
import items from './Test';
import loginActions from './Login'
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  items,
  loginActions,
  routing: routerReducer
});
