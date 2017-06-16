import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';
import eventsList from './EventsReducers';

export default combineReducers({
  items,
  login,
  eventsList,
  routing: routerReducer
});
