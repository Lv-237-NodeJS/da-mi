import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { Login, Message } from 'src/components';
import './Home.scss';

export default class Home extends React.Component {

  render() {
    return (
      <Grid>
        <Message />
        <Row className='show-grid'>
          <Col sm={12} md={8}>
            <PageHeader className='text-center'>Da-Mi</PageHeader>
            <p>Some text about our project!!!</p>
          </Col>
          <Col sm={12} md={4} className='login'>
            <Login />
          </Col>
        </Row>
      </Grid>
    );
  }
}
