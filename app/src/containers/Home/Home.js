import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { Login, Alerts } from 'src/components';
import './home.scss';

export default class Home extends React.Component {

  render() {
    return (
      <div className='background-gift-image'>
        <Grid>
          <Alerts />
          <Row className='show-grid background-block'>
            <Col sm={12} md={8}>
              <PageHeader className='text-center'>Da-Mi</PageHeader>
              <div className='home-image-block'>
                <div className='about-text'>
                  <h2>DA-MI - always get what you need</h2>
                  <p>service that helps people to invite 
                    guests to their celebration and to order gifts they wish to get.</p>
                </div>  
              </div>
            </Col>
            <Col sm={12} md={4} className='login'>
              <Login />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
