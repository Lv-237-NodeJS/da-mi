import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { About, Home, Contacts, Main } from '../components';

const routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={Home}/>
    <Route path='about' component={About}/>
    <Route path='contacts' component={Contacts}/>
  </Route>
);

export default routes;
