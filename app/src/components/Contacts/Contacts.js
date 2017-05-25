import React from 'react';
import { Link } from 'react-router';

export default class Contacts extends React.Component {
  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <h2>Contact us</h2>
        <Link to="contacts/address">Address</Link>
        <Link to="contacts/maps">Maps</Link>
        {this.props.children}
      </div>
    );
  }
}
