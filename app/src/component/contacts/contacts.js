import React, { Component } from 'react';
import { Link } from 'react-router';

class Contacts extends Component {
  render(){
    return (
      <div>
        <h1>Contacts</h1>
        <Link to="contacts/address">Address</Link>&nbsp;
        <Link to="contacts/maps">Maps</Link>
        {this.props.children}
      </div>
    );
  }
}

export default Contacts;
