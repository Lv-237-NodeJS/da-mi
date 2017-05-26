import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button }
from 'react-bootstrap';
import { Link } from 'react-router';

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} required/>
    </FormGroup>
  );
}

export default class Signup extends React.Component {
	render () {
		return (
			<div className="container">
	      <Form>
			    <FieldGroup
			      id="name"
			      type="text"
			      label="YOUR NAME"
			      placeholder="Enter your name"
			    />
			    <FieldGroup
			      id="email"
			      type="email"
			      label="EMAIL ADDRESS"
			      placeholder="Enter your email"
			    />
			    <FieldGroup
			      id="password"
			      label="PASSWORD"
			      type="password"
			      placeholder="Enter your password"
			    />
			    <FieldGroup
			      id="password-repeat"
			      label="REPEAT YOUR PASSWORD"
			      type="password"
			      placeholder="Repeat your password"
			    />
			    <Link to='/email'>
	      		<Button type="submit" bsSize="large">SUBMIT</Button>
	      	</Link>
	    	</Form>
		  </div>
    );
	}
}
