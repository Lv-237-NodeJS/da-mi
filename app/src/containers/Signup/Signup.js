import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form, HelpBlock } from 'react-bootstrap';
import { Message } from '../../components';
import messages from '../../helper/messages';
import './Signup.scss';
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
          email: false,
          password: false,
          confirmation: false,
        },
        enableBatton: false
    };
  }

  handleChange = param => e => {
    let value = e.target.value;
    this.setState({[param]: value},
      () => {this.validateField(param, value);});
  };

  validateField = (fieldName, value) => {
    const pattern = {
      email: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}$/,
      confirmation: this.state.password 
    };
    const valid = value.match(pattern[fieldName]);
    const newState = this.state;
    newState.isErrors[fieldName] = !valid ? messages[fieldName + 'Error'] : '';
    const isEmpty = errors => {
      let result = true;
      for(let key in errors) {
        (errors[key] !== '') && (result = false);
      }
      return result;
    }
    newState.enableBatton = isEmpty(newState.isErrors);
    this.setState({enableBatton: newState.enableBatton && (this.state.confirmation === this.state.password)});
  }

  handleButtonClick = e => {
    e.preventDefault();
    this.props.actions.signupUser(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className='containerLog'>
        <Message />
        <Form className='Signup' onSubmit={this.handleButtonClick}>
          {['email', 'password', 'confirmation'].map(param =>
            <FieldGroup
              key={param}
              className={!!this.state.isErrors[param] && 'has-error'}
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
            type='submit'
            disabled = {!this.state.enableBatton}>Regist
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
