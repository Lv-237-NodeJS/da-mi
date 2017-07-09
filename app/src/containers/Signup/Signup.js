import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from 'src/redux/signUp';
import { Message } from 'src/components';
import { messages } from 'src/helper';
import './Signup.scss';

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

class Signup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmation: '',
      isErrors: {
        email: null,
        password: null,
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
      email: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,20}$/
    };
    const newState = this.state;
    const validateByPattern = name => {
      newState.isErrors[name] = !newState[name].match(pattern[name]) && 
      messages[name + 'Error'] || '';
    };
    const validateConfirmation = () => {
      newState.isErrors.confirmation = newState.confirmation !== newState.password && 
      messages.confirmationError || '';
    };
    validateByPattern(fieldName) || newState.isErrors.confirmation !== null &&
    validateConfirmation() && newState.isErrors.password !== null &&
    validateByPattern('password') && validateConfirmation();
    
    newState.enableButton = Object.keys(newState.isErrors).map(key => 
      newState.isErrors[key]).every(element => element === '');
    this.setState(newState);
  };
  
  handleButtonClick = e => {
    e.preventDefault();
    this.props.actions.signupUser(this.state.email, this.state.password);
  };

  render() {
    const inputsName = {
      email: 'Email',
      password: 'Password',
      confirmation: 'Confirmation password'
    };
    return (
      <div className='containerLog'>
        <Message />
        <Form className='Signup' onSubmit={this.handleButtonClick}>
          { Object.keys(inputsName).map(param =>
            <FieldGroup
              key={param}
              className={!!this.state.isErrors[param] && 'has-error'}
              label={inputsName[param]}
              type={param === 'email' && param || 'password'}
              name={param}
              isErrors={this.state.isErrors[param]}
              placeholder={inputsName[param]}
              value={this.state.param}
              onChange={this.handleChange(param)}
              required />
          )}
          <Button 
            className='btn btn-primary'
            type='submit'
            disabled = {!this.state.enableButton}>Regist
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  signup: state.signup
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(showActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(Signup);
