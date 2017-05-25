import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button }
from 'react-bootstrap';
import { Link } from 'react-router';

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

export default class Signup extends React.Component {
	render () {
		return (
			<div className="container">
	      <Form>
			    <FieldGroup
			      id="formControlsText"
			      type="text"
			      label="YOUR NAME"
			      placeholder="Enter your name"
			    />
			    <FieldGroup
			      id="formControlsEmail"
			      type="email"
			      label="EMAIL ADDRESS"
			      placeholder="Enter your email"
			    />
			    <FieldGroup
			      id="formControlsPassword"
			      label="PASSWORD"
			      type="password"
			    />
			    <FieldGroup
			      id="formControlsPassword"
			      label="REPEAT YOUR PASSWORD"
			      type="password"
			    />
			    <Link to='/home/email'>
	      		<Button bsSize="large" block>SUBMIT</Button>
	      	</Link>
	    	</Form>
		  </div>
    );
	}
}
