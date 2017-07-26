import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalWindow.scss';

export default class ModalWindow extends React.Component {
  render() {
    const { title, bsStyle, buttonClassName, buttonName, toggleModal,
      styleName, body, showModal, buttonSave, } = this.props;
    const bsSize = (title == 'Add gift') ? 'large' : null;
    const giftButton = (
      <div className={buttonClassName}>
        <Button onClick={toggleModal} bsSize={bsSize} block >
          {buttonName}
        </Button>
      </div>
    );
    const headerButton = (
      bsSize ? giftButton :
      <Button bsStyle={bsStyle} className={buttonClassName || ''} onClick={toggleModal}>
        {buttonName}
      </Button>
    );

    return (
      <div>
        {headerButton}
        <Modal
          className={styleName}
          show={showModal}
          onHide={toggleModal}
          backdropClassName='modal-backdrop'>
          <Modal.Header closeButton>
            <Modal.Title> {title} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {body}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
