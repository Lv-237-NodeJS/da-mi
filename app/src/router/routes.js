// .app/src/router/routes.js

import React, { Component } from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import About from '../component/about/about';
import Home from '../component/home/home';
import Contacts from '../component/contacts/contacts';
import Main from '../component/main/main';
import Address from '../component/address/address';
import Maps from '../component/maps/maps';
import Another_region from '../component/another_region/another_region';

const routes = (
  <Route path="/" component={Main}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
    <Route path="contacts" component={Contacts}>
      <Route path="/contacts/maps" component={Maps}/>
      <Route path="/contacts/address" component={Address}>
      	<Route path="/contacts/address/another_region" component={Another_region}/>
      </Route>
    </Route>
  </Route>
);

export default routes;