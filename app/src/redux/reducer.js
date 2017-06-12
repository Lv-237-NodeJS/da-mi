import { combineReducers } from 'redux';
import items from './Test';
import profile from './Profile';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  items,
  profile,
  routing: routerReducer
});
