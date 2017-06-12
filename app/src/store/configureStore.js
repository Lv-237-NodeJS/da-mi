import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './../redux/reducer';

const middleware = [routerMiddleware(browserHistory), thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(middleware)
  );
}
