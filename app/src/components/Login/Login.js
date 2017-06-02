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
        {['email', 'password'].map(param =>
          <InputGroup
            key={param}
            id={param}
            label={param}
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
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
