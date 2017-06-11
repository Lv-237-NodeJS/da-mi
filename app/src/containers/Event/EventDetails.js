import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Nav, Col, Button, ButtonToolbar, PageHeader, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../redux/eventReducers';

class EventDetails extends React.Component {
  
  constructor (props, context) {
    super(props, context);

    this.state = {
      events: []
    };
  }
  
  componentDidMount() {
    this.props.actions.fetchEvents(this.state.events);
  }

  componentWillMount() {
    const data = this.props.events;
    this.setState({ events: data.events });
  }

  render() {       
    const id = this.props.params.id; 
   
    const event = this.state.events.filter((item) => {
      if (item.id == id) { 
        return item;                   
      }  
    }); 

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
          <PageHeader className="text-center"> { event[0].name } </PageHeader>
            <ButtonToolbar>
              <Button bsStyle="primary"> Edit </Button>
              <Button bsStyle="danger"> Delete </Button>
            </ButtonToolbar>
            <div>
                <h3>Details: </h3>                
                <p><strong> Date </strong>: { event[0].date_event } </p>
                <p><strong> Place </strong>: { event[0].location_name } </p>
                <p><strong> Description </strong>: { event[0].description } </p>
            </div>
            
            { this.props.children }
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
