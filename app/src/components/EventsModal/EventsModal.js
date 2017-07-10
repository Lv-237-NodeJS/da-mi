import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { EventsModalForm } from 'src/components';
import './EventsModal.scss';

export default class EventsModal extends React.Component {
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
        <Button className='main-button' onClick={this.toggleModal}>
          Edit
        </Button>
        <Modal
          className='editEventModal'
          show={this.state.showModal}
          onHide={this.toggleModal}
          backdropClassName='modal-backdrop'>
          <Modal.Header closeButton>
            <Modal.Title>Here, you can update your own event:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EventsModalForm closeModal={this.toggleModal} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
