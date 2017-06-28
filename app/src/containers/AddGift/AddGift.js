import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './../../../styles/modal.scss';

export default class AddGift extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  render () {
    return (
      <div>
        <Button bsSize="large" block onClick={this.toggleModal}>Add gift</Button>
        <Modal className='modal-dialog' show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add gift</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Add gift here</div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
