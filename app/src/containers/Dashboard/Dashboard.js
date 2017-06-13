import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem, Tab, Row, Col } from 'react-bootstrap';

import EventsList from './EventsList';

export default class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={4}>
             <Nav bsStyle="pills" stacked>
               <NavItem eventKey="first">
                 My Cabinet
              </NavItem>
              <NavItem eventKey="second">
                My Events
              </NavItem>
              <NavItem eventKey="third">
                Invited
              </NavItem>
              <NavItem eventKey="fourth">
                Create New Event
              </NavItem>
             </Nav>
            </Col>
      <Col sm={8}>
        <Tab.Content animation>
          <Tab.Pane eventKey="first">
            Profile component will be here
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <EventsList />
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            My guests will he here
          </Tab.Pane>
          <Tab.Pane eventKey="fourth">
            Create new event coponent will be here
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
      </div>
    );
  }
}
