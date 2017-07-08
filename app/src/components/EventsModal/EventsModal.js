import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { EventsModalForm } from './../';
import './EventsModal.scss';

export default class EventsModal extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  }

  render () {
    return (
      <div>
        <Button bsStyle='primary' onClick={this.toggleModal}>
          Edit
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={this.toggleModal}
          backdropClassName='modal-backdrop'>
          <Modal.Header closeButton>
            <Modal.Title>Here, you can update your own event:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EventsModalForm/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
