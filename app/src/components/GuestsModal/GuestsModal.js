import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GuestsModalForm } from './../';
import './GuestsModal.scss';

export default class GuestsModal extends React.Component {
  
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
        <Button
          bsStyle='primary'
          className='pull-right'
          onClick={this.toggleModal}>Add Guests</Button>
        <Modal
          show={this.state.showModal}
          onHide={this.toggleModal}
          backdropClassName='modal-backdrop'>
          <Modal.Header closeButton>
            <Modal.Title>Invite people</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GuestsModalForm closeModal={this.toggleModal} eventId={this.props.eventId}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
