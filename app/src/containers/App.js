import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Routes from './../router';
import configureStore from './../store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={Routes} />
      </Provider>
    );
  }
};
