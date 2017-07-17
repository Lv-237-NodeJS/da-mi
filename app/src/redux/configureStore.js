import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const middleware = [routerMiddleware(browserHistory), thunk];

(process.env.NODE_ENV !== 'production') && middleware.push(createLogger());

const configureStore = initialState => createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default configureStore;
