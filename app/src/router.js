import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import { About, Address, Another_region, Home, Contacts, Main, Maps } from './components';

const Routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={Home}/>
    <Route path='about' component={About}/>
    <Route path='contacts' component={Contacts}>
    	<Route path='address' component={Address}>
    		<Route path='/contacts/address/another_region' component={Another_region}/>
    	</Route>
    	<Route path='maps' component={Maps}/>
    </Route>
  </Route>
);

export default Routes;
