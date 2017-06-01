import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { About, Address, Home, Contacts, Main, Maps } from './containers';

const Routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={Home}/>
    <Route path='about' component={About}/>
    <Route path='contacts' component={Contacts}>
      <Route path='address' component={Address}/>
      <Route path='maps' component={Maps}/>
    </Route>
  </Route>
);

export default Routes;
