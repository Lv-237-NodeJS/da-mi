import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Nav, Col, Button, ButtonToolbar, PageHeader, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../redux/eventReducers';

<<<<<<< f461c55d99e72e7e1ca6dc28fad4f0d949ee6977
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
=======
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

    event = this.props.event;
>>>>>>> Add reducers and actions

    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={12} md={4}>
<<<<<<< f461c55d99e72e7e1ca6dc28fad4f0d949ee6977
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
=======

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
>>>>>>> Add reducers and actions
          </Col>
          <Col sm={12} md={8}>
          <PageHeader className="text-center"> { event.name } </PageHeader>
<<<<<<< f461c55d99e72e7e1ca6dc28fad4f0d949ee6977
            <ButtonToolbar>
              <Button bsStyle="primary"> Edit </Button>
              <Button bsStyle="danger"> Delete </Button>
            </ButtonToolbar>
            <div>
                <h3>Details: </h3>
=======
            <div>
                <h1>Details: </h1>
>>>>>>> Add reducers and actions
                <p><strong> Date </strong>: { event.date_event } </p>
                <p><strong> Place </strong>: { event.location_name } </p>
                <p><strong> Description </strong>: { event.description } </p>
            </div>
<<<<<<< f461c55d99e72e7e1ca6dc28fad4f0d949ee6977
            { this.props.children }
=======

           { this.props.children }

>>>>>>> Add reducers and actions
          </Col>
        </Row>
      </Grid>
    );
  }
<<<<<<< f461c55d99e72e7e1ca6dc28fad4f0d949ee6977
}
=======
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

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailPage);
>>>>>>> Add reducers and actions
