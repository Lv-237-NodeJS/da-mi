import { combineReducers } from 'redux';
import items from './Test';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  items,
  routing: routerReducer
});
