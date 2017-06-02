import { combineReducers } from 'redux';
import items from './itemReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  items,
  routing: routerReducer
});

export default rootReducer;
