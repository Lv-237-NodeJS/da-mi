import React from 'react';
import { Link } from 'react-router';
import { Col, Button, ButtonToolbar, PageHeader, Tabs, Tab, ListGroup, ListGroupItem }
  from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GuestsModal } from './../../components';
import * as eventActions from '../../redux/eventReducers';
import * as inviteActions from '../../redux/inviteReducers';
import * as editEventActions from '../../redux/editEventReducers';
import './eventDetails.scss';

const GuestsList = ({guest, ...props}) => (
  <ListGroupItem>{guest}
    <Button
      {...props}
      type='button'
      className='guests-delete-btn pull-right glyphicon glyphicon-trash'
      bsStyle='danger'>
    </Button>
  </ListGroupItem>
);

class EventDetails extends React.Component {
  componentWillMount() {
    const {params: {id}, actions, guestActions} = this.props;
    actions.fetchEventById(id);
    guestActions.getEmails(id);
  }

  sendInvites = () => {
    const {params: {id},
      owner: {first_name: firstName, last_name: lastName},
      guestActions} = this.props;
    guestActions.sendInvites(id, {firstName, lastName});
  }

  deleteGuestEmail = i => () => {
    const {params: {id}, guests, guestActions} = this.props;
    const guest = guests[i];
    guestActions.deleteGuest(id, guest.id);
  }

  render() {
    const {params: {id}, event, guests} = this.props;
    return (
      <div className='eventDetails'>
        <Col sm={6}>
          <Tabs defaultActiveKey={1} id='uncontrolled-tab-example'>
            <Tab eventKey={1} title='Event Details'>
              <PageHeader className='text-center'> { event.name } </PageHeader>
              <ButtonToolbar>
                 <EventsModal eventId={event.id} />
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
                  <GuestsModal eventId={id}/>
                </ListGroupItem>
                {guests.length && guests.map((guest, index) =>
                  <GuestsList
                    key={index}
                    guest={guest.email}
                    onClick={this.deleteGuestEmail(index)}
                  />) ||
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
  event: state.event.current,
  guests: state.invite.guests,
  owner: state.profile.data,
  updatedEvent: state.editEvent.updatedEvent
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(eventActions, dispatch),
  guestActions: bindActionCreators(inviteActions, dispatch),
  editEventActions: bindActionCreators(editEventActions, dispatch),
  editEventActions: bindActionCreators(editEventActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
