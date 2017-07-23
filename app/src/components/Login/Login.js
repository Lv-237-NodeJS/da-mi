import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button }
  from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from './loginActions';
import './Login.scss';

const InputGroup = ({id,  ...props}) => (
  <FormGroup controlId={id}>
    <Col sm={12} md={12}>
      <FormControl {...props} required/>
    </Col>
  </FormGroup>
);

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = stateName => e => {
    this.setState({[stateName]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.actions.loginUser(this.state.email, this.state.password);
  };

  render() {

    return (
      <div>
        <Form className='login-form' horizontal onSubmit={this.handleSubmit} data-state=
          {this.state}>
          {['email', 'password'].map(param =>
            <InputGroup
              key={param}
              id={param}
              type={param}
              placeholder={param.toUpperCase()}
              value={this.state[param]}
              onChange={this.handleChange(param)} />
          )}
          <FormGroup>
            <Col  sm={12} md={12} className='login-button'>
              <Button type='submit' bsSize='large' className='main-button'>
                Login
              </Button>
              {this.props.badInputs &&
                <p className='text-danger'>{this.props.message}</p>
              }
            </Col>
          </FormGroup>
        </Form>
        <p className='text-center text-or'>OR</p>
        <Link to='/signup' className='signup-button'>
          <Button bsSize='large' className='signup' block>SIGN UP</Button>
        </Link>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  badInputs: state.login.illegalInput,
  message: state.login.message
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
