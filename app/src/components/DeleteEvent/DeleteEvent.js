import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deleteEventActions from './deleteEventActions';
import { ModalWindow } from 'src/components';

class DeleteEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {       
      showModal: false    
    };
  }
  
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  handleButtonClick = e => {
    this.props.deleteEventActions.deleteEvent(this.props.eventId);    
  };

  render() {
    const title = 'Delete event';
    const buttonYes = (
      <div className='well'>
        <h4 className='deleteEventModalBodyHeader'>Are you sure that you want to delete this event?</h4>
        <Button bsStyle='danger' className='eventYesButton' bsSize="large" onClick={this.handleButtonClick} block>
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

const mapStateToProps = state => ({
  event: state.event.current
});

const mapDispatchToProps = dispatch => ({
  deleteEventActions: bindActionCreators(deleteEventActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEvent);
