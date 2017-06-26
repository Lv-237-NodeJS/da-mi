import React from 'react';
import { Row, Col, Image, FormGroup, ControlLabel, Form, FormControl, Button, ButtonToolbar,
  Tabs, Tab  } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import './profile-style.scss';

let FieldGroup = ({id, label, ...props}) => (
  <div>
    <FormGroup controlId = {id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  </div>
);

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // firstName: this.props.profile.firstName,
      // lastName: this.props.profile.lastName,
      // birthdate: this.props.profile.birthdate,
      // address: this.props.profile.address,
      // city: this.props.profile.address,
      // country: this.props.profile.country
    };
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    // const profile = this.props.profile;

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
                  { Object.keys(fieldsName).map(param => 
                    <FieldGroup 
                      key={param}
                      controlId='formBasicTex'
                      label={fieldsName[param]}
                      name={param}
                      placeholder={fieldsName[param]}
                      value={this.state.profile}
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
  profile: state.profile.profile,
  userId: state.login.userId
});

export default connect(mapStateToProps)(Profile);
