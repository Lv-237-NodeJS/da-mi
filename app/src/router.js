import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { About, Home, Contacts, Main, Signup,
  EventsList, EventDetails, Profile, newEvent } from './containers';
import checkAuth from './helper/redirections';

const Routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={Home} onEnter={checkAuth}/>
    <Route path='about' component={About}/>
    <Route path='contacts' component={Contacts}/>
    <Route path='signup' component={Signup}/>
    <Route path='events' component={EventsList}/>
    <Route path='invitations' component={EventsList}/>
    <Route path='newevent' component={newEvent}/>
    <Route path='events/:id' component={EventDetails}/>
    <Route path='invitations/:id' component={EventDetails}/>
    <Route path='profile' component={Profile}/>
  </Route>
);

export default Routes;
