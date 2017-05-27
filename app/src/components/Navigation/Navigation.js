import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Nav bsStyle="pills" activeKey={1}>
            <LinkContainer to='/'>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to='/about'>
              <NavItem eventKey={2}>About</NavItem>
            </LinkContainer>
            <LinkContainer to='/contacts'>
              <NavItem eventKey={3}>Contacts</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
