// ./app/src/app.js

import React, { Component } from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';

import routes from './router/routes';

ReactDOM.render(
  <Router history={hashHistory} routes={routes}/>,
  document.body
);