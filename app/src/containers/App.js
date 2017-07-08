import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Routes from 'src/router';
import configureStore from 'src/store/configureStore';

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
}
