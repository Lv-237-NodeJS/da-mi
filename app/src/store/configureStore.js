import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
  );
}
