import React from 'react';
import {Link} from 'react-router';
import {Home} from './home.js';
import {About} from './about.js';
import {Contact} from './contact.js';
import {Event} from './event.js';
import {Header} from './header.js';




export class Root extends React.Component {

	render () {
		return (
				<div>
					<Header />
					{this.props.children}
				</div>
			)
	}
}