import { combineReducers } from 'redux';

import items from './Test';
import event from './eventReducers';
import { routerReducer } from 'react-router-redux';
import items from './Test';
import login from './Login';

export default combineReducers({
  event,
  items,
  login,
  routing: routerReducer
});
