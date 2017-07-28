import React from 'react';
import { Link } from 'react-router';
import { Col, Button, ButtonToolbar, PageHeader, Tabs, Tab, ListGroup, ListGroupItem, Label }
  from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Gift } from 'src/containers';
import * as eventActions from './eventActions';
import * as inviteActions from './inviteActions';
import { GuestsForm, DeleteEvent, EventsForm, Alerts } from 'src/components';
import './eventDetails.scss';

const GuestsList = ({guest, ...props}) => (
  <ListGroupItem>{guest.email}
    {props['data-show'] &&
    <Button
      {...props}
      type='button'
      className='guests-delete-btn pull-right glyphicon glyphicon-trash'
      bsStyle='danger'>
    </Button>
    }
    <Label 
      className={`pull-right guest-status-label ${guest.status}`}>
      {guest.status}
    </Label>
  </ListGroupItem>
);

class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null
    };
  }

  componentWillMount() {
    const {params: {id}, actions, guestActions} = this.props;
    actions.fetchEventById(id);
    guestActions.getGuestsList(id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({status: nextProps.status});
  }

  sendInvites = () => {
    const {params: {id},
      owner: {first_name: firstName, last_name: lastName},
      guestActions} = this.props;
    guestActions.sendInvites(id, {firstName, lastName});
  };

  deleteGuestEmail = i => () => {
    const {params: {id}, guests, guestActions} = this.props;
    const guest = guests[i];
    guestActions.deleteGuest(id, guest.id);
  };

  changeGuestStatus = status => () => {
    const {guestActions, params: {id}} = this.props;
    guestActions.changeGuestStatus(status, id);
    this.setState({status});
  };

  render() {
    const guestStatus = {
      going: 'Going',
      notgoing: 'Not Going'
    };
    const {params: {id}, event, guests, location, owner} = this.props;
    const showButtons = location.pathname.includes('/events/');
    const formattedDate = moment(event.date_event, 'x').format('DD MMM YYYY hh:mm a');
    const isCurrentStatus = status => this.state.status === status;

    return (
      <div className='eventDetails'>
        <Alerts />
        <Col sm={6}>
          <Tabs defaultActiveKey={1} id='event-tab'>
            <Tab eventKey={1} title='Event Details'>
              <PageHeader className='text-center'>{event.name}</PageHeader>
              <ButtonToolbar>
                {showButtons &&
                <div>
                  <EventsForm event={event} />
                  <DeleteEvent eventId={event.id} />
                  <Button
                    type='button'
                    bsStyle='primary'
                    onClick={this.sendInvites}>
                    Send Invites</Button>
                </div> ||
                <div>
                  {Object.keys(guestStatus).map(param =>
                    <Button
                      key={param}
                      className={`guest-status-btn ${isCurrentStatus(param) && 'current-guest-status-btn'}`}
                      onClick={this.changeGuestStatus(param)}>
                      {isCurrentStatus(param) &&
                      <span className='glyphicon glyphicon-ok'></span>}
                      {guestStatus[param]}
                    </Button>
                  )}
                </div>
                }
              </ButtonToolbar>
              <div>
                <h3>Details:</h3>
                <p><span className='event-caption'>Date:</span>{formattedDate}</p>
                <p><span className='event-caption'>Place:</span>{event.location_name}</p>
                <p><span className='event-caption'>Description:</span>{event.description}</p>
              </div>
            </Tab>
            <Tab eventKey={2} title='Guests'>
              <ListGroup>
                <ListGroupItem className='clearfix'>
                  <h4 className='pull-left'>Guests list</h4>
                  {showButtons && <GuestsForm eventId={id} />}
                </ListGroupItem>
                {guests.length && guests.map((guest, index) =>
                  <GuestsList
                    data-show={showButtons}
                    key={index}
                    guest={guest}
                    onClick={this.deleteGuestEmail(index)} />) ||
                  <p className='text-center'>You have not added guests yet.</p>
                }
              </ListGroup>
            </Tab>
            <Tab eventKey={3} title='Gifts'>
              <h2>Gift list</h2>
              <Gift id={id} showButtons={showButtons} author={owner} />
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
  status: state.event.guestStatus
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(eventActions, dispatch),
  guestActions: bindActionCreators(inviteActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
