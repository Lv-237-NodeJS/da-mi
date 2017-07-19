import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ALERTS } from 'src/helper';
import * as showActions from './AlertsActions';
import './Alerts.scss';

class Alerts extends React.Component {
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
  message: state.alerts.message,
  show: state.alerts.show,
  view: state.alerts.view
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(showActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(Alerts);
