import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './DeleteEventModal';

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
            <Modal.Title>Are you sure that you want to delete this event?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button bsStyle='danger' className='pull-left deleteEventModalYes' onClick={this.toggleModal}>
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
