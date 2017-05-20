import React, { Component } from 'react';
import { Link } from 'react-router';



class Address extends Component {
  render(){
    return (
    	<div>
    	<h2>You can find us in Lviv</h2>
    	<Link to="/contacts/address/another_region">another_region</Link>
    	{this.props.children}
    	</div>
    	)
  }
}

export default Address;
