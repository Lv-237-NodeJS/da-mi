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
            <div className='well'>
              <h4 className='deleteEventModalBodyHeader'>Are you sure that you want to delete this event?</h4>
              <Button bsStyle='danger' bsSize="large" onClick={this.handleButtonClick} block>
                Yes
              </Button>
              <Button bsStyle='success' bsSize="large" onClick={this.toggleModal} block>
                No
              </Button>
            </div>
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
