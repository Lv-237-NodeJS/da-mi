import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar, Form, HelpBlock } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import style from './Signup.scss';

let request = require('superagent');
let user = {firstName: 'Ivan', lastName: 'Popov', email: 'rrr@ukr.net'};

const FieldGroup = ({className, label, inErrors, ...props}) => {
  return (
    <div>
      <FormGroup className={className}>
       <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {inErrors && <HelpBlock>{inErrors}</HelpBlock>}
        <FormControl.Feedback />
      </FormGroup>
    </div>
  );
};

export default class Signup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmation: '',
      inErrors: {email: '', password: '', confirmation: ''},
      emailValid: false,
      passwordValid: false,
      confirmationValid: false,
      inValid: false,
    };
  };

  handleChange = (param) => (e) => {
    let value = e.target.value;
    this.setState({[param]: value},
                  () => {this.validateField(param, value)});
  };

validateField = (fieldName, value) => {
    const mail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}$/;

    let inErrors = this.state.inErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmationValid = this.state.confirmationValid;

    switch (fieldName) {
      case 'email':

        emailValid = value.match(mail);
        inErrors.email = emailValid ? '' : 'e-mail is not correct';
        break;
      case 'password':
        passwordValid = value.match(pass);
        inErrors.password = passwordValid ? '' : 'At least 6 characters, one (a-z), one (A-Z), one (0-9), one ($@$!%*?&)';

        inErrors.confirmation = (this.state.confirmation === this.state.password) ? '' : 'passwords do not match';
        break;
      case 'confirmation':
        inErrors.password = passwordValid ? '' : 'At least 6 characters, one (a-z), one (A-Z), one (0-9), one ($@$!%*?&)';
        inErrors.confirmation = (this.state.confirmation === this.state.password) ? '' : 'passwords do not match';
        break;
      default:
        break;
    }

    this.setState({inErrors: inErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                  }, this.validateIn);
  }

  validateIn = () => {
    this.setState({inValid: this.state.emailValid && this.state.passwordValid && this.state.confirmation === this.state.password});
  }

  errorClass = (error) => {
    return (error.length === 0 ? '' : 'has-error');
  }

  handleButtonClick = (e) => {
    e.preventDefault();
    request
    .post('http://localhost:8081/api/reg/user')
    .set(user)
    .end(function(err, res) {
     if (err || !res.ok) {
       return ('No connection with server');
     } else {
       return (browserHistory.push('/'), 'You have successfully signed up! For confirmation please visit your e-mail');
     }
  });
  }

  render() {
    return (
      <div className='containerLog'>
      <Form className='LoginForm' onSubmit={this.handleButtonClick}>
          {['first_Name', 'last_Name'].map(param =>
          <FieldGroup
            key={param}
            label={param[0].toUpperCase() + param.slice(1).replace('_', ' ')}
            type={'text'}
            name={param}
            placeholder={'Enter ' + param[0].toUpperCase() +
            param.slice(1).replace('_', ' ')}
            value={this.state.param}
            onChange={this.handleChange(param)}
            />
            )}
          {['email', 'password', 'confirmation'].map(param =>
            <FieldGroup
            key={param}
            className={`${this.errorClass(this.state.inErrors[param])}`}
            label={param[0].toUpperCase() +
              param.slice(1).replace('onfirmation', 'onfirmation Password') +
              '*'}
            type={param.replace('confirmation', 'password')}
            name={param}
            inErrors={this.state.inErrors[param]}
            placeholder={'Enter ' + param[0].toUpperCase() +
              param.slice(1).replace('onfirmation', 'onfirmation Password')}
            value={this.state.param}
            onChange={this.handleChange(param)}
            required
            />
            )}
          <Button className='btn btn-primary'
                  disabled={!this.state.inValid}
                  type='submit'>Regist
          </Button>
      </Form>
      </div>
    );
  }

}
