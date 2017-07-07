import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GuestsModalForm } from 'src/components';
import './GuestsModal.scss';

export default class GuestsModal extends React.Component {
<<<<<<< 7bcdd5eaf77486d22f08dae063d0ccced2c7df36
  constructor(props) {
=======
  constructor (props) {
>>>>>>> make some change in files
    super(props);
    this.state = {
      showModal: false
    };
  }
  
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };
<<<<<<< 7bcdd5eaf77486d22f08dae063d0ccced2c7df36

  render() {
=======
>>>>>>> make some change in files

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
            <GuestsModalForm closeModal={this.toggleModal} eventId={this.props.eventId} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
