import React from 'react';
import {Link} from 'react-router';
import {Home} from './home.js';
import {About} from './about.js';
import {Contact} from './contact.js';
import {Event} from './event.js';




export class Header extends React.Component {

	render () {
		return (
				<div>
					<nav className="navbar navbar-default">
  						<div className="container-fluid">
    						<div className="navbar-header">
      							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        							<span className="sr-only">Toggle navigation</span>
        							<span className="icon-bar"></span>
        							<span className="icon-bar"></span>
        							<span className="icon-bar"></span>
      							</button>
      							<a className="navbar-brand" href="#"><Link to={"/home/10"}>DA-MI</Link></a>
    						</div>
	    					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      						<ul className="nav navbar-nav">
	        						<li><Link to={"/about"}>About</Link></li>
	        						<li><Link to={"/contact"}>Contact</Link></li>
	      						</ul>
	    					</div>
	  					</div>
					</nav>
					
				</div>
			)
	}
}