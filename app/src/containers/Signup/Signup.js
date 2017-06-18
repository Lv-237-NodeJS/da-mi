import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form, HelpBlock } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import messages from '../../helper/messages';
import request from 'superagent';
import style from './Signup.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from '../../redux/Signup';

let FieldGroup = ({className, label, isErrors, ...props}) => (
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
        email: '',
        password: '',
        confirmation: ''
      },
      emailValid: false,
      passwordValid: false,
      confirmationValid: false
    };
  };

  handleChange = param => e => {
    let value = e.target.value;
    this.setState({[param]: value},
                  () => {this.validateField(param, value)});
  };

  validateField = (fieldName, value) => {
    const mail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}$/;

    let isErrors = this.state.isErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmationValid = this.state.confirmationValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(mail);
        isErrors.email = emailValid ? '' : `${messages.emailError}`;
        break;
      case 'password':
        passwordValid = value.match(pass);
        isErrors.password = passwordValid ? '' : `${messages.passwordError}`;
        break;
      case 'confirmation':
        isErrors.confirmation =
          (this.state.confirmation === this.state.password) ? '' : `${messages.confirmationError}`;
        break;
      default:
        break;
    }

    this.setState({isErrors: isErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                  }, this.isValidate);
  }

  isValidate = () => {
    this.setState({
      Validate:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.confirmation === this.state.password
    });
  }

  errorClass = (error) => {
    return (error.length === 0 ? '' : 'has-error');
  }

  handleButtonClick = e => {
    e.preventDefault();
    this.props.actions.signupUser(this.state.email, this.state.password)
  }

  render() {
    return (
      <div className='containerLog'>
      <Message />
        <Form className='Signup' onSubmit={this.handleButtonClick}>
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
              className={`${this.errorClass(this.state.isErrors[param])}`}
              label={param[0].toUpperCase() +
                param.slice(1).replace('onfirmation', 'onfirmation Password') +
                '*'}
              type={param.replace('confirmation', 'password')}
              name={param}
              isErrors={this.state.isErrors[param]}
              placeholder={'Enter ' + param[0].toUpperCase() +
                param.slice(1).replace('onfirmation', 'onfirmation Password')}
              value={this.state.param}
              onChange={this.handleChange(param)}
              required
            />
          )}
          <Button 
            className='btn btn-primary'
            disabled={!this.state.Validate}
            type='submit'>Regist
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  return {
    signup: state.signup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(showActions, dispatch)
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Signup);