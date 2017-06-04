import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button }
from 'react-bootstrap';
const request = require('superagent');
import { Link } from 'react-router';
import { URL } from './../../helper/constants';
import style from './Login.scss';


let InputGroup = ({id, label, ...props}) => (
  <FormGroup controlId={id}>
    <Col componentClass={ControlLabel} sm={12} md={3}>
      {label}
    </Col>
    <Col sm={12} md={9}>
      <FormControl {...props} required/>
    </Col>
  </FormGroup>
);

export default class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      notAutorized: false
    };
  }

  handleChange = (stateName) => (e) => {
    this.setState({[stateName]: e.target.value});
  }
  
  user = () => ({
    'email': this.state.email,
    'password': this.state.password
  })

  handleSubmit = (e) => {
    const self = this;
    e.preventDefault();
    request
      .post(URL.LOGIN)
      .send(self.user())
      .end(function(err, res) {
        if (err || !res.ok) {
          self.setState({'notAutorized': true});
        } else {
          const token = JSON.parse(res.text).token;
          sessionStorage.setItem('token', token);
          window.location.reload();
        }
    });
  }

  render () {
    return (
      <div>
        <Form className="login-form" horizontal onSubmit={this.handleSubmit}>
          {['email', 'password'].map(param =>
            <InputGroup
              key={param}
              id={param}
              label={param.toUpperCase()}
              type={param}
              placeholder={param.toUpperCase()}
              value={this.state.param}
              onChange={this.handleChange(param)}
            />
          )}
          <FormGroup>
            <Col smOffset={0} sm={12} mdOffset={3} md={9}>
              <Button type="submit" bsStyle="primary" bsSize="large">
                Login
              </Button>
              {this.state.notAutorized &&
                <p className="text-danger">Email or password is not valid!</p>
              }
            </Col>
          </FormGroup>
        </Form>
        <p className="text-center">OR</p>
        <Link to='/signup'>
          <Button bsSize="large" block>SIGN UP</Button>
        </Link>
      </div>
    );
  }
}
