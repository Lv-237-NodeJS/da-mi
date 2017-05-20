import React from 'react';
import {Link, browserHistory} from 'react-router';
import {Event} from './event.js';

export class About extends React.Component {
   onNavigatebutton() {
   	browserHistory.push("/contact");
   };

   render() {
      return (
         <div>
            <h1>About...</h1>
            <button onClick={this.onNavigatebutton} className="btn btn-primary">Contact me!</button>
            <p>This projec...</p>
            <Link to={"/about/event"}>EVENT</Link>
            {this.props.children}
         




         </div>
      )
   }
}