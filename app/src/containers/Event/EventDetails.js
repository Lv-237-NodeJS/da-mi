import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, PageHeader, } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

class EventDetails extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.fetchEventById(this.props.params.id);
  }

  render() {
    // const events = this.props.response.data;
    // const id = this.props.params.id;
    // const event = events.filter(event => {
    //   if (event.id == id) {
    //     return event;
    //   }
    // });

    const event = this.props.event;

    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={12} md={4}>

          <PageHeader className="text-center"> Menu </PageHeader>
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
          <PageHeader className="text-center"> { event.name } </PageHeader>
            <div>
                <h1>Details: </h1>
                <p><strong> Date </strong>: { event.date_event } </p>
                <p><strong> Place </strong>: { event.location_name } </p>
                <p><strong> Description </strong>: { event.description } </p>
            </div>

           { this.props.children }

          </Col>
        </Row>
      </Grid>
    );
  }
};
const mapStateToProps = (state, ownProps) => {
  return {
    event: state.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEventById: eventId => dispatch(
      EventActions.fetchEventById(eventId)
  ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
