import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';
import event from './eventReducers';
import eventsList from './eventsReducer';

export default combineReducers({
  items,
  login,
  event,
  eventsList,
  routing: routerReducer
});
