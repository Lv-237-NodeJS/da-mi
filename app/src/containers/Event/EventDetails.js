import React from 'react';
import { Link } from 'react-router';
import { Col, Button, ButtonToolbar, PageHeader, Tabs, Tab, ListGroup, ListGroupItem }
  from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../redux/eventReducers';
import * as inviteActions from '../../redux/invite';
import './eventDetails.scss';

class EventDetails extends React.Component {

  componentWillMount() {
    this.props.actions.fetchEventById(this.props.params.id);
    this.props.guestActions.getEmails();
  }

  sendInvites = () => {
    this.props.guestActions.sendInvites();
  }

  deleteGuestEmail = i => () => {
    const guest = this.props.guests[i];
    this.props.guestActions.deleteGuest(guest);
  }

  render() {

    const id = this.props.params.id;
    const event = this.props.event.current;
    const guests = this.props.guests;

    return (
      <div className='eventDetails'>
        <Col sm={6}>
          <Tabs defaultActiveKey={1} id='uncontrolled-tab-example'>
            <Tab eventKey={1} title='Event Details'>
              <PageHeader className='text-center'> { event.name } </PageHeader>
              <ButtonToolbar>
                <Button bsStyle='primary'> Edit </Button>
                <Button bsStyle='danger'> Delete </Button>
                <Button
                  type='button'
                  bsStyle='primary'
                  onClick={this.sendInvites}>
                  Send Invites</Button>
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
              <ListGroup>
                <ListGroupItem className='clearfix'>
                  <h4 className='pull-left'>Guests list</h4>
                </ListGroupItem>
                {guests.length ? guests.map((guest, index) =>
                  <ListGroupItem key={index}>{guest.User.email}
                    <Button
                      type='button'
                      onClick={this.deleteGuestEmail(index)}
                      className='guests-delete-btn pull-right'
                      bsStyle='danger'>
                  X
                    </Button>
                  </ListGroupItem>) :
                  <p className='text-center'>You have not added guests yet.</p>
                }
              </ListGroup>
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
  guests: state.invite.guests
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(eventActions, dispatch),
  guestActions: bindActionCreators(inviteActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
