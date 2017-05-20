import React from 'react';
import ReactDOM from 'react-dom';
import {Home} from './components/home.js';
import {About} from './components/about.js';
import {Contact} from './components/contact.js';
import {Root} from './components/root.js';
import {Header} from './components/header.js';
import {Event} from './components/event.js';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

class App extends React.Component {
   render() {
      return (
        <Router history={browserHistory}>
   			<Route path={"/"} component={Root}>
            <IndexRoute component={Home} />
               <Route path={"home/:id"} component={Home} />
               <Route path={"about"} component={About} >
                  <Route path={"event"} component={Event} />
               </Route>
               <Route path={"contact"} component={Contact} />
            </Route>
            
           
   		</Router>
      )
   }
}



ReactDOM.render(
   
   <App />, 
   	document.getElementById('app'));