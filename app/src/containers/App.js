import React from 'react';
import Routes from './../router';
import { Router, browserHistory } from 'react-router';

export default class App extends React.Component {
    render() {
      return (
        <Router history={browserHistory} routes={Routes} />
      );
    }
};
