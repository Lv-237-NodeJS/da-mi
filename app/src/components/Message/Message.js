import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from 'src/containers/Signup/signupActions';
import './Message.scss';

class Message extends React.Component {
  hide = () => {
    this.props.actions.showAlert(false);
  };
  
  render() {
    if (this.props.show) {
    setTimeout(this.hide, 4000);
    return (
      <Alert bsStyle={this.props.view} onDismiss={this.hide} className='alertContainer' >
        <p className='alertText'>{this.props.message}</p>
      </Alert>
    );
  }
    return null; 
}
}

const mapStatetoProps = state => ({
  message: state.signup.message,
  show: state.signup.show,
  view: state.signup.view
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(showActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(Message);
