import React from 'react';
import { Row, Col, Image, FormGroup, ControlLabel, Form, FormControl, Button, ButtonToolbar,
  Tabs, Tab  } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
// import moment from 'moment';
// import 'react-datepicker/src/stylesheets/datepicker.scss';
import './profile.scss';
import DatePicker from 'react-bootstrap-date-picker';

let FieldGroup = ({label, ...props}) => (
  <div>
    <FormGroup controlId='formControlsText'>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  </div>
);

class Profile extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      birthdate: '',
      address: '',
      city: '',
      country: ''
    };
  }

  handleChange = stateName => e => {
    this.setState({[stateName]: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.actions.updateProfile(this.state.param);
  }

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
              
              <Form horizontal onSubmit={this.handleSubmit}>
                <Row>
                  { Object.keys(fieldsName, profile).map(param => 
                    param == 'birthdate'?
                      <FormGroup  bsSize="medium">
                        <ControlLabel>Birthdate</ControlLabel>
                        <DatePicker dateFormat="MM/DD/YYYY" value={profile[param]} onChange={this.handleChange}
                        />
                      </FormGroup>
                      : 
                      <FieldGroup 
                        key={param}
                        label={fieldsName[param]}
                        name={param}
                        type={param == 'birthdate' && 'date' || 'text' }
                        placeholder={profile[param]}
                        value={this.state.param}
                        onChange={this.handleChange(param)}
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
