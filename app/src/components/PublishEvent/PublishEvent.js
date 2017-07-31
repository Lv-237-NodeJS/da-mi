import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editEventActions from './../EventsForm/editEventActions';
import * as inviteActions from './../../containers/Event/inviteActions';
import { ModalWindow } from 'src/components';

class PublishEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  handleButtonClick = () => {
    const eventId = this.props.eventId;
    const {owner: {first_name: firstName, last_name: lastName}} = this.props;
    const event = {status_event: 'public'};

    this.props.editEventActions.editEvent(eventId, event);
    this.props.guestActions.sendInvites(eventId, {firstName, lastName});
    this.toggleModal();
  };

  render() {
    const title = 'Publish Event';
    const publishEvent = (
      <div className='well'>
        <h4 className='publishEventModalBodyHeader'>Are you sure that you want to publish this event?</h4>
        <div>
          Note, that after publishing event you will not been able to add new guests and invite them, add new gifts...
          After clicking the button it will automatically send the invitations to your guests.
        </div>
        <Button className='eventYesButton main-button' bsSize="large" onClick={this.handleButtonClick} block>
          Yes
        </Button>
      </div> 
    );

    return (
      <div>
        <ModalWindow
          title = {title}
          buttonName={'Publish Event'}
          styleName = {'publishEventModal'}
          bsStyle = {'success pull-right main-button'}
          body = {publishEvent}
          toggleModal = {this.toggleModal} showModal = {this.state.showModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.current,
  owner: state.profile.data
});

const mapDispatchToProps = dispatch => ({
  editEventActions: bindActionCreators(editEventActions, dispatch),
  guestActions: bindActionCreators(inviteActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishEvent);
