import React, { Component } from 'react';
import { Link } from 'react-router';

class Main extends Component {
  render(){
    return (
      <div>
        <h1>Da-Mi</h1>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/about">About</Link>&nbsp;
        <Link to="/contacts">Contacts</Link>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
