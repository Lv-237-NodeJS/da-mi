import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Dashboard, About, Address, Home, Contacts, Main, Maps, Signup } from './containers';

const Routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={Home}/>
    <Route path='dashboard' component={Dashboard}/>
    <Route path='about' component={About}/>
    <Route path='contacts' component={Contacts}>
      <Route path='address' component={Address}/>
      <Route path='maps' component={Maps}/>
    </Route>
    <Route path='signup' component={Signup}/>
  </Route>
);

export default Routes;
