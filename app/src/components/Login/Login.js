import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button }
from 'react-bootstrap';

export default class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (stateName) => (e) => {
    this.setState({[stateName]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render () {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="email">
          <Col componentClass={ControlLabel} sm={12} md={3}>
            Email
          </Col>
          <Col sm={12} md={9}>
            <FormControl type="email"
                         placeholder="Email"
                         value={this.state.email}
                         onChange={this.handleChange('email')}
                         required />
          </Col>
        </FormGroup>
        <FormGroup controlId="password">
          <Col componentClass={ControlLabel} sm={12} md={3}>
            Password
          </Col>
          <Col sm={12} md={9}>
            <FormControl type="password"
                         placeholder="Password"
                         value={this.state.password}
                         onChange={this.handleChange('password')}
                         required />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={0} sm={12} mdOffset={3} md={9}>
            <Button type="submit" bsStyle="primary" bsSize="large">
              Login
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
