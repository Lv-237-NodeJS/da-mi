import React from 'react';
import { Row, Col, Image, FormGroup, ControlLabel, Form, FormControl, Button, ButtonToolbar,
  Tabs, Tab  } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './profile-style.scss';

class Profile extends React.Component {

  render() {
    const profile = this.props.profile;
    return (
      <div className='profile-details'>
        <Col sm={8} className='container'>
          <Tabs defaultActiveKey={1} id='uncontrolled-tab-example'>
            <Tab eventKey={1} title='Profile Info'>
              <h1>Edit Profile</h1>
              <Row>
                <Col  md={4} className='text-center'>
                  <div className='no-avatar'></div>
                  <h6>Upload a different photo</h6>
                  <input type="file" className="form-control" />
                </Col>
              </Row>
              
              <Form block='true' horizontal>
                <Row>
                  <Col sm={5}>
                    <FormGroup controlId='formBasicText' />
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                      value={profile.firstName}
                      type="text"
                      placeholder="Enter text"
                    />
                    <FormGroup  controlId='formBasicText' />
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                      value={profile.lastName}
                      type="text"
                      placeholder="Enter text"
                    />
                    <FormGroup  controlId='formBasicText' />
                    <ControlLabel>Birthdate</ControlLabel>
                    <FormControl
                      value={profile.birthdate}
                      type="text"
                      placeholder="Enter text"
                    />
                  </Col>

                  <Col  sm={5}>
                    <FormGroup  controlId='formBasicText' />
                    <ControlLabel>Address</ControlLabel>
                    <FormControl
                      value={profile.address}
                      type="text"
                      placeholder="Enter text"
                    />
                    <FormGroup  controlId='formBasicText' />
                    <ControlLabel>City</ControlLabel>
                    <FormControl
                      value={profile.city}
                      type="text"
                      placeholder="Enter text"
                    />
                    <FormGroup  controlId='formBasicText' />
                    <ControlLabel>Country</ControlLabel>
                    <FormControl
                      value={profile.country}
                      type="text"
                      placeholder='Enter text'
                    />
                  </Col>
                </Row>
                <Row> 
                  <hr/> 
                  <ButtonToolbar smOffset={2} sm={10}>
                    <Button type='submit' bsStyle='primary'>
                      Save Changes
                    </Button>
                    <span> </span>
                    <Button type='reset' bsStyle='default'>
                      Cancel
                    </Button>
                  </ButtonToolbar>
                </Row> 
              </Form>
            </Tab>
            <Tab eventKey={2} title='Security Settings'>
            </Tab>

          </Tabs>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  userId: state.login.userId
});

export default connect(mapStateToProps)(Profile);
