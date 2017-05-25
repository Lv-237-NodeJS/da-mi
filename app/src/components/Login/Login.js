import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button }
from 'react-bootstrap';
import style from './Login.scss';

export default class Login extends React.Component {
	render () {
		return (
      <Form horizontal>
    		<FormGroup controlId="email">
      		<Col componentClass={ControlLabel} sm={12} md={3}>
        		Email
      		</Col>
      		<Col sm={12} md={9}>
        		<FormControl type="email" placeholder="Email" required />
      		</Col>
    		</FormGroup>

		    <FormGroup controlId="password">
		      <Col componentClass={ControlLabel} sm={12} md={3}>
		        Password
		      </Col>
		      <Col sm={12} md={9}>
		        <FormControl type="password" placeholder="Password" required />
		      </Col>
		    </FormGroup>

		    <FormGroup>
		      <Col smOffset={0} sm={12} mdOffset={3} md={9}>
		        <Button type="submit" bsStyle="primary" bsSize="large" block>
		          Sign in
		        </Button>
		      </Col>
		    </FormGroup>
	  	</Form>
    );
	}
}
