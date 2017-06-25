import React from 'react';
import { Grid, Row, Col, PageHeader, Image } from 'react-bootstrap';

export default class About extends React.Component {
  render() {
    const Names = {
      'Maryana Svitlyk': require('../../../img/Maryana.svg'),
      'Yulianna Korol': require('../../../img/Yulya.svg'),
      'Ivan Yarymovych': require('../../../img/Vanja.svg'), 
      'Andrii Voitovych': require('../../../img/Andriy.svg'),
      'Denis Bodnar': require('../../../img/Denis.svg'),
      'Ivan Shyyka': require('../../../img/Ivan.svg'),
      'Yuriy Kokhalevych': require('../../../img/Yura.svg')
    };
    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} sm={12} md={12}>
            <PageHeader className='text-center'>Da-Mi</PageHeader>
            <p>Do you plan to celebrate your birthday, wedding or other event 
            and do not want to get 3 identical electric kettles as a gift? 
            Then it's up to you! Our project will help you to get only the desired 
            gifts. Register and get the opportunity to create an event and send an 
            invitation to the guests. Make your list of gifts, and guests can 
            choose any of the gifts you desire, buy it individually or join forces.</p>
          </Col>
        </Row>
        <Row className='show-grid'>
          <PageHeader className='text-center'>Our Team</PageHeader>
          {Object.keys(Names).map(param =>
            <Col xs={3} sm={3} md={3}>
              <Image src={Names[param]} thumbnail/>
              <p>{param}</p>
            </Col>
          )}
        </Row>
        <Row className='show-grid'>
          <p>We are a young, talented and fun team that creates a new and promising product. 
          We are evolving and changing to make it easier for you to plan events and make them 
          more memorable and impressive. We look forward to your comments and wishes.</p>
        </Row>
      </Grid>
    );
  }
}
