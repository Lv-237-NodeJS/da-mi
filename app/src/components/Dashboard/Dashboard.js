import React from 'react';
import { Nav, NavItem, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './dashboard.scss';

export default class Dashboard extends React.Component {

  render() {
    return (
      <div className='dashboard-menu'>
        <Col sm={3}>
          <h1>Dashboard</h1>
          <Nav bsStyle='pills' stacked activeKey={1}>
            <LinkContainer to='/events'>
              <NavItem eventKey={1}>My Events</NavItem>
            </LinkContainer>
            <LinkContainer to='/newEvent'>
              <NavItem eventKey={2}>Create New Event</NavItem>
            </LinkContainer>
            <LinkContainer to='/invitations'>
              <NavItem eventKey={3}>My Invitations</NavItem>
            </LinkContainer>
            <LinkContainer to='/profile'>
              <NavItem eventKey={4}>My Profile</NavItem>
            </LinkContainer>
          </Nav>
        </Col>
      </div>
    );
  }
}
