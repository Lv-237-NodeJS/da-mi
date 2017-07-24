import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from 'src/components/Alerts/AlertsActions';
import { Alerts } from 'src/components';
import { messages } from 'src/helper';
import './ResetPassword.scss';

const FieldGroup = ({className, label, isErrors, ...props}) => (
  <div>
    <FormGroup className = {className}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {isErrors && <HelpBlock>{isErrors}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  </div>
);

class ResetPassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmation: '',
      isErrors: {
        oldPassword: null,
        newPassword: null,
        confirmation: null,
      },
      enableButton: false
    };
  }

  handleChange = param => e => {
    let value = e.target.value;
    this.setState({[param]: value},
      () => {this.validateField(param);});
  };

  validateField = fieldName => {
    const pattern = {
      newPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,20}$/
    };
    const newState = this.state;
    const validateByPattern = name => {
      newState.isErrors[name] = !newState[name].match(pattern[name]) && 
      messages['passwordError'] || '';
    };
    const validateConfirmation = () => {
      newState.isErrors.confirmation = newState.confirmation !== newState.newPassword && 
      messages.confirmationError || '';
    };
    validateByPattern(fieldName) || newState.isErrors.confirmation !== null &&
    validateConfirmation() && newState.isErrors.newPassword !== null &&
    validateByPattern('newPassword') && validateConfirmation();
    
    newState.enableButton = Object.keys(newState.isErrors).map(key => 
      newState.isErrors[key]).every(element => element === '');
    this.setState(newState);
  };
  
  handleButtonClick = e => {
    e.preventDefault();
    this.props.actions.resetPassword(this.state.oldPassword, this.state.newPassword);
  };

  render() {
    const inputsName = {
      oldPassword: 'Old password',
      newPassword: 'New password',
      confirmation: 'Confirmation password'
    };
    return (
      <div className='containerUpdate'>
        <Form className='Update' onSubmit={this.handleButtonClick}>
          { Object.keys(inputsName).map(param =>
            <FieldGroup
              key={param}
              className={!!this.state.isErrors[param] && 'has-error'}
              label={inputsName[param]}
              type={'password'}
              name={param}
              isErrors={this.state.isErrors[param]}
              value={this.state[param]}
              onChange={this.handleChange(param)}
              required />
          )}
          <Button 
            className='btn btn-primary main-button'
            type='submit'
            disabled = {!this.state.enableButton}>Change
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  alerts: state.alerts
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(showActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(ResetPassword);
