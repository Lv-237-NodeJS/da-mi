import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ALERTS } from 'src/helper';
import * as showActions from 'src/containers/Signup/signupActions';
import './Message.scss';

class Message extends React.Component {
  hide = () => {
    this.props.actions.showAlert(false);
  };
  
  render() {
    return (
      <div>
        {this.props.show && setTimeout(this.hide, ALERTS.TIME) &&
        <Alert bsStyle={this.props.view} onDismiss={this.hide} className='alertContainer'>
          <p className='alertText'>{this.props.message}</p>
        </Alert>}
      </div>
    );
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
