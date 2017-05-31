import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button }
from 'react-bootstrap';

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
        <InputGroup
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange('email')}
        />
        <InputGroup
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
        />
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
