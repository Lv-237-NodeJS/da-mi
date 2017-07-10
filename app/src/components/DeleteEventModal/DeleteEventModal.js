import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deleteEventActions from 'src/redux/deleteEventReducers';
import './DeleteEventModal.scss';

class DeleteEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  handleButtonClick = e => {
    this.props.deleteEventActions.deleteEvent(this.props.eventId);
    console.log("This.props: ", this.props);
  };

  render() {
    return (
      <div>
        <Button bsStyle='danger' onClick={this.toggleModal}>
          Delete Event
        </Button>
        <Modal
          className='deleteEventModal'
          show={this.state.showModal}
          onHide={this.toggleModal}
          backdropClassName='modal-backdrop'>
          <Modal.Header className='deleteEventModalHeader' closeButton>
            <Modal.Title>Delete event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className='deleteEventModalBodyHeader'>Are you sure that you want to delete this event?</h4>
            <Button bsStyle='danger' className='pull-left deleteEventModalYes' onClick={this.handleButtonClick}>
              Yes
            </Button>
            <Button bsStyle='success' className='pull-right deleteEventModalNo' onClick={this.toggleModal}>
              No
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.current
});

const mapDispatchToProps = dispatch => ({
  deleteEventActions: bindActionCreators(deleteEventActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEventModal);
