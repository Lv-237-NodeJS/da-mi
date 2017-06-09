import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, PageHeader, } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

export default class Event extends React.Component {

  render() {
    const events = this.props.response.data;
    const id = this.props.params.id;
    const event = events.filter(event => {
      if (event.id == id) {
        return event;
      }
    });

    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={12} md={4}>

          <PageHeader className="text-center">Menu</PageHeader>
            <Nav bsStyle="pills" stacked >
              <Link className="list-group-item" to={'/events/' + id + '/guests'}>
                  Guests
                </Link>
                <Link className="list-group-item" to={'/events/' + id + '/gifts'}>
                  Gifts
                </Link>
                <Link className="list-group-item" to='/events'>
                  Back to Events
                </Link>
            </Nav>
          </Col>

          <Col sm={12} md={8}>
          <PageHeader className="text-center">{event[0].name}</PageHeader>
            <div>
                <h1>Details: </h1>
                <p><strong>Place </strong>: {event[0].location_name}</p>
                <p><strong>Date </strong>: {event[0].date_event}</p>
                <p><strong>Description</strong>: {event[0].description}</p>
            </div>
            
           {this.props.children}

          </Col>
        </Row>
      </Grid>
    );
  }
};
