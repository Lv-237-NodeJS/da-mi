import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from './Message.scss';

export default class Message extends React.Component {
  hide = () => {
    this.props.actions.showModal(false);
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.hide}
        id="modal-container"
        className="modal-backdrop">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
          </Modal.Title>
        </Modal.Header>     
      </Modal>
    );
  } 
}
