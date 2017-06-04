import React from 'react';
import { Grid, Row, Col, Button, PageHeader } from 'react-bootstrap';
import { Login, Secret } from '../../components';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }
  
  componentWillMount () {
    sessionStorage.getItem('token')? this.setState({loggedIn: true}): this.setState({loggedIn: false})
  }

  render() {

    return (
      <Grid>
        {!this.state.loggedIn ?
          <Row className="show-grid">
            <Col sm={12} md={8}>
              <PageHeader className="text-center">Da-Mi</PageHeader>
              <p>Some text about our project!!!</p>
            </Col>
            <Col sm={12} md={4}>
               <Login />
            </Col>
          </Row> :
          <Secret />
        }
      </Grid>
    );
  }
}
