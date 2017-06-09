import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import { eventsReducer, eventReducer } from './reducers/EventReducer';
import items from './Test';
import login from './Login';
import event from './eventReducers';

export default combineReducers({
  items,
  login,
  events: eventsReducer,
  event: eventReducer,
  event,
  routing: routerReducer
});
