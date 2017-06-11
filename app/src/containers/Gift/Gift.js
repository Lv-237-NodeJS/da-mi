import React from 'react';
import { Link } from 'react-router';
import { Col, Button, ButtonToolbar, PageHeader, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../redux/Gift';

class EventDetails extends React.Component {

  componentWillMount() {
    this.props.actions.fetchEventById(this.props.params.id);
    this.setState({ event: this.props.event.current });
  }

  render() {

    const id = this.props.params.id;
    const event = this.props.event.current;

    return (
      <div className='eventDetails'>
        <Col sm={6}>
          <Tabs defaultActiveKey={1} id='uncontrolled-tab-example'>
            <Tab eventKey={1} title='Event Details'>
              <PageHeader className='text-center'> { event.name } </PageHeader>
              <ButtonToolbar>
                <Button bsStyle='primary'> Edit </Button>
                <Button bsStyle='danger'> Delete </Button>
              </ButtonToolbar>
              <div>
                <h3>Details: </h3>
                <p><strong> Date </strong>: { Date(event.date_event) } </p>
                <p><strong> Place </strong>: { event.location_name } </p>
                <p><strong> Description </strong>: { event.description } </p>
              </div>
              { this.props.children }
            </Tab>
            <Tab eventKey={2} title='Guests'>
              <Link className='list-group-item' to={'/events/' + id + '/guests'}>Guests</Link>
            </Tab>
            <Tab eventKey={3} title='Gifts'>
              <Link className='list-group-item' to={'/events/' + id + '/gifts'}>
                  Gifts
              </Link>
            </Tab>
          </Tabs>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(eventActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
