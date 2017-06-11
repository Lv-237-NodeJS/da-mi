import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { About, Address, Home, Contacts, Main, Maps, Signup, 
  Gift, Guest, Test, Event, EventDetails } from './containers';

const Routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={Home}/>
    <Route path='about' component={About}/>
    <Route path='contacts' component={Contacts}>
      <Route path='address' component={Address}/>
      <Route path='maps' component={Maps}/>
    </Route>
    <Route path='signup' component={Signup}/>
    <Route path='test' component={Test}/>
    <Route path='events' component={Event}/>
    <Route path='events/:id' component={EventDetails}>   
      <Route path='guests' component={Guest}/>
      <Route path='gifts' component={Gift}/>
    </Route> 
  </Route>
);

export default Routes;
