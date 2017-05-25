import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import style from './Main.scss';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Nav bsStyle="pills" activeKey={1}>
            <NavItem eventKey={1}>
              <Link to='/'>Home</Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to='/about'>About</Link>
            </NavItem>
            <NavItem eventKey={3}>
              <Link to='/contacts'>Contacts</Link>
            </NavItem>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}
