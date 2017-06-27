import React from 'react';
import { Row, Col, Image, FormGroup, ControlLabel, Form, FormControl, Button, ButtonToolbar,
  Tabs, Tab  } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import './profile-style.scss';

let FieldGroup = ({label, ...props}) => (
  <div>
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  </div>
);

class Profile extends React.Component {

  render() {
    const { profile } = this.props;

    const fieldsName = {
      firstName: 'First Name',
      lastName: 'Last Name',
      birthdate: 'Birthdate',
      address: 'Address',
      city: 'City',
      country: 'Country'
    };

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
                  <input type='file' className='form-control' />
                </Col>
              </Row>
              
              <Form horizontal>
                <Row>
                  { Object.keys(fieldsName, profile).map(param => 
                    <FieldGroup 
                      key={param}
                      label={fieldsName[param]}
                      name={param}
                      placeholder={fieldsName[param]}
                      value={profile[param]}
                    /> 
                  )}
                </Row>
                <Row> 
                  <hr/> 
                  <ButtonToolbar>
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
  profile: state.profile.data
});

export default connect(mapStateToProps)(Profile);
