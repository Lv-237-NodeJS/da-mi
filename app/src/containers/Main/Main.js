import React from 'react';
import { Navigation } from './../../components';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <h1>Da-Mi</h1>
        <Link to='/'>Home</Link>&nbsp;
        <Link to='/about'>About</Link>&nbsp;
        <Link to='/contacts'>Contacts</Link>&nbsp;
        <Link to='/test'>Test</Link>
        {this.props.children}
      </div>
    );
  }
}
