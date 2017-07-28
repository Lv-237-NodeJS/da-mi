import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editEventActions from './../EventsModalForm/editEventActions';
import { ModalWindow } from 'src/components';

class PublishEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {       
      showModal: false,      
    };
  }
  
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  handleButtonClick = e => {
    this.props.editEventActions.editEvent(this.state);    
  };

  render() {
    const title = 'Publishing Event';
    const buttonYes = (
      <div className='well'>
        <h4 className='deleteEventModalBodyHeader'>Are you sure that you want to publish this event?</h4>
        <Button bsStyle='danger' className='deleteEventYesButton' bsSize="large" onClick={this.handleButtonClick} block>
          Yes
        </Button>
      </div> 
    );

    return (
      <div>        
        <ModalWindow
          title = {title}
          buttonName={'Delete Event'}
          styleName = {'deleteEventModal'}
          bsStyle = {'danger'}
          body = {buttonYes}
          toggleModal = {this.toggleModal} showModal = {this.state.showModal}
        />
      </div>
    );
  }
}
