import React from 'react';
import { Grid, Row, Col, PageHeader, Image } from 'react-bootstrap';
import texts from '../../helper/texts';
import './About.scss';

export default class About extends React.Component {
  render() {
    const names = {
      'Maryana Svitlyk': 'photo-Maryana',
      'Yulianna Korol': 'photo-Yulya',
      'Ivan Yarymovych': 'photo-Vanja', 
      'Andrii Voitovych': 'photo-Andriy',
      'Denis Bodnar': 'photo-Denis',
      'Ivan Shyika': 'photo-Ivan',
      'Yuriy Kokhalevych': 'photo-Yura'
    };
    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={6} sm={6} md={6} >
            <div id='photo-gift'className="container"></div>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <PageHeader className='text-center'>Da-Mi</PageHeader>
            <p className='textAbout'>{texts.descriptionOurProgectPart1}</p> 
            <p className='textAbout'>{texts.descriptionOurProgectPart2}</p>
          </Col>
        </Row>
        <Row className='show-grid'>
          <PageHeader className='text-center'>Our Team</PageHeader>
          <p className='textAbout'>{texts.descriptionOurTeam}</p>
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
