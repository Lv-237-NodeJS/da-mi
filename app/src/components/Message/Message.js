import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from 'src/redux/signUp';
import './Message.scss';

class Message extends React.Component {
  hide = () => {
    this.props.actions.showModal(false);
  };
  
  render() {
    return (
      <Modal
        className='messageModal'
        show={this.props.show}
        onHide={this.hide}
        backdropClassName='modal-backdrop'>
        <Modal.Header closeButton />
        <Modal.Body id='contained-modal-body-lg'>
          <p className='modalText'>{this.props.message}</p>
        </Modal.Body>
      </Modal>
    );
  } 
}

const mapStatetoProps = state => ({
  message: state.signup.message,
  show: state.signup.show  
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(showActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(Message);
