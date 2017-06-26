import React from 'react';
import { Grid, Row, Col, PageHeader, Image } from 'react-bootstrap';
import './About.scss';

export default class About extends React.Component {
  render() {
    const names = {
      'Maryana Svitlyk': 'Maryana',
      'Yulianna Korol': 'Yulya',
      'Ivan Yarymovych': 'Vanja', 
      'Andrii Voitovych': 'Andriy',
      'Denis Bodnar': 'Denis',
      'Ivan Shyika': 'Ivan',
      'Yuriy Kokhalevych': 'Yura'
    };
    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={6} sm={6} md={6} >
            <div id='gift'className="container"></div>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <PageHeader className='text-center'>Da-Mi</PageHeader>
            <p className='textAbout' xs={6} sm={4} md={3} >Do you plan to celebrate your birthday, wedding or other event 
            and do not want to get 3 identical electric kettles as a gift &#63; 
            Then it&#39;s up to you! </p> 
            <p className='textAbout' xs={6} sm={4} md={3} >Our project will help you to get only the desired 
            gifts. Register and get the opportunity to create an event and send an 
            invitation to the guests. Make your list of gifts, and guests can 
            choose any of the gifts you desire, buy it individually or join forces.
            This will facilitate the process of choosing gifts for guests and help 
            you get closer to your dream</p>
          </Col>
        </Row>
        <Row className='show-grid'>
          <PageHeader className='text-center'>Our Team</PageHeader>
          <p className='textAbout'>We are young, talented and fun team that creates a new and promising product. 
          We are evolving and changing to make it easier for you to plan events and make them 
          more memorable and impressive. We look forward to your comments and wishes.</p>
          {Object.keys(names).map(param =>
            <Col xs={6} sm={4} md={3} key={param}>
              <div id={names[param]} className="container"></div>
              <p className='textTeam'>{param}</p>
            </Col>
          )}
        </Row>        
      </Grid>
    );
  }
}
