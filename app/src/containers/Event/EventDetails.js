import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Nav, Col, Button, ButtonToolbar, PageHeader, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../redux/eventReducers';

@connect( (state, ownProps) => ({ 
  event: state.event
  }), dispatch => ({  actions: bindActionCreators(eventActions, dispatch) }))

export default class EventDetails extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      current: {},
    };
  }

  componentWillMount() {
    this.props.actions.fetchEventById(this.props.params.id);
    this.setState({ event: this.props.event.current });
  }

  render() {

    const id = this.props.params.id;
    const event = this.props.event.current;

    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={12} md={4}>
          <PageHeader className="text-center"> Menu </PageHeader>
            <Link className="list-group-item" to={'/events/' + id + '/guests'}>
              Guests
            </Link>
            <Link className="list-group-item" to={'/events/' + id + '/gifts'}>
              Gifts
            </Link>
            <Link className="list-group-item" to='/events'>
              Back to Events
            </Link>
          </Col>
          <Col sm={12} md={8}>
          <PageHeader className="text-center"> { event.name } </PageHeader>
            <ButtonToolbar>
              <Button bsStyle="primary"> Edit </Button>
              <Button bsStyle="danger"> Delete </Button>
            </ButtonToolbar>
            <div>
                <h3>Details: </h3>
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
}
