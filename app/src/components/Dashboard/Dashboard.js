import React from 'react';
import { Nav, NavItem, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './dashboard.scss';

export default class Dashboard extends React.Component {

  render() {
    const links = [
      {route: '/events', label: 'My Events'},
      {route: '/newevent', label: 'Create New Event'},
      {route: '/invitations', label: 'My Invitations'},
      {route: '/profile', label: 'My Profile'}
    ];

    return (
      <div className='dashboard-menu'>
        <Col sm={3}>
          <h1>Dashboard</h1>
          <Nav id='dashboard' activeKey={1}>
            {links.map((param, index) =>
              <LinkContainer key={index} to={param.route}>
                <NavItem eventKey={index}>{param.label}</NavItem>
              </LinkContainer>
            )}
          </Nav>
        </Col>
      </div>
    );
  }
}
