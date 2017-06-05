import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from './Message.scss';
import MESSAGES from '../../helper/messages.js';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
  }

  showModal = () => {
    let show = this.state.show; 
    this.setState({show: show});
  }
  
  hideModal = () => {
    let show = this.state.show;
    this.setState({show: !show});
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal}
        id="modal-container"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            <p>{MESSAGES.SIGNUP}</p>          
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={this.hideModal} id="modButton">Close</Button>
        </Modal.Footer>      
      </Modal>
    );
  } 
}
