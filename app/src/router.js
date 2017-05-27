import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { About, Home, Contacts, Signup, Main, CheckEmail }
from './components';

const Routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={Home}/>
    <Route path='about' component={About}/>
    <Route path='contacts' component={Contacts}/>
    <Route path='signup' component={Signup}/>
  </Route>
);

export default Routes;
