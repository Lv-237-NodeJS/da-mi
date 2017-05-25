import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Button, PageHeader} from 'react-bootstrap';
import { Login, CheckEmail } from '../';
import style from './Home.scss'

export default class Home extends React.Component {
  render() {
  	return (
	    <Grid>
		    <Row className="show-grid">
		      <Col sm={12} md={8}>
		      	<PageHeader className="center">Da-Mi</PageHeader>
		      	{this.props.children}
		      	<p id="homeText">Some text about our project!!!</p>
		      </Col>
		      <Col sm={12} md={4}>
		      	<Login />
		      	<p className="center">OR</p>
	      		<Link to='/signup'>
	      			<Button bsSize="large" block>SIGN UP</Button>
	      		</Link>
		      </Col>
		    </Row>
	  	</Grid>
	  );
  }
}
