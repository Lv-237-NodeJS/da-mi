import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from '../../redux/Signup';
import './Message.scss';

export default class Message extends React.Component {
  hide = () => {
    this.props.actions.showModal(false);
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.hide}
        id='modal-container'
        className='modal-backdrop'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-lg'>
            <p>{this.props.message}</p>
          </Modal.Title>
        </Modal.Header>     
      </Modal>
    );
  } 
}
