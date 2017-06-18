import React from 'react';
import { Nav, NavItem, Tab, Row, Col } from 'react-bootstrap';
import EventsList from '../../containers/Events/EventsList';

export default class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Tab.Container id='left-tabs-example' defaultActiveKey={0}>
          <Row className='clearfix'>
            <Col sm={4}>
              <Nav bsStyle='pills' stacked>
                {[
                  'My Cabinet',
                  'My Events',
                  'Invitations',
                  'Create New Event'
                ].map((title, index) => <NavItem key={index} eventKey={index}>{title}</NavItem>)}
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                {[
                  'Profile Component will be here',
                  <EventsList />,
                  'My invitations will be here',
                  'Create new Event component will be here'
                ].map((content, index) => <Tab.Pane key={index} eventKey={index}>{content}</Tab.Pane>)}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}
