import React from 'react';
import { Grid, Row, Col, Button, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Login, Dashboard } from '../../components';

class Home extends React.Component {

  render() {
    return (
      <Grid>
        {!this.props.isAuth ?
          <Row className="show-grid">
            <Col sm={12} md={8}>
              <PageHeader className="text-center">Da-Mi</PageHeader>
              <p>Some text about our project!!!</p>
            </Col>
            <Col sm={12} md={4}>
               <Login />
            </Col>
          </Row> :
          <Dashboard />
        }
      </Grid>
    );
  }
}

const mapStatetoProps = state => ({
  isAuth: state.login.isAuth
});

export default connect(mapStatetoProps)(Home);
