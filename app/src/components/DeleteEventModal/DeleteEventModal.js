import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './DeleteEventModal.scss';

export default class DeleteEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
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
            <Button bsStyle='danger' className='pull-left deleteEventModalYes'>
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
