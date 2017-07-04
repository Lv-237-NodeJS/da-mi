import React from 'react';
import { Row, Col, Image, FormGroup, ControlLabel, Form, FormControl, Button, ButtonToolbar,
  Tabs, Tab  } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from '../../redux/profileReducers';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';

import './profile.scss';

let FieldGroup = ({id, label, ...props}) => (
  <div>
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  </div>
);

class Profile extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name,
      birth_date: this.props.profile.birth_date,
      address: this.props.profile.address,
      city: this.props.profile.city,
      country: this.props.profile.country,
      avatar: this.props.profile.avatar
    };
  }
  

  componentWillMount() {
    const { profile } = this.props;
    this.setState(profile);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.profile);
  }

  handleChange = stateName => e => {
    this.setState({
      [stateName]: e.target.value
    });
  };

  handleSubmit = (e) => {
    this.props.actions.updateProfile(this.state);
  }

  dateTimeFieldHandleChange = e => {
    const date = new Date(parseInt(e));
    this.setState({
      birth_date: date
    });
  };

  handleChangeImage = e => {
    const self = this;
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = upload => {
      self.setState({
        avatar: upload.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  datePickerFields = (param, birthdateString) => {
    return (
      <FormGroup  key={param}>
        <ControlLabel>Birthdate</ControlLabel>
        <DateTimeField className='date-picker' key={param} 
          mode='date' 
          dateTime={birthdateString}
          format={'YYYY-MM-DD'}
          inputFormat={'DD/MM/YY'}
          onChange={this.dateTimeFieldHandleChange}/>
      </FormGroup>
    );
  };

  textFields = (param, fieldsName) => {
    return (
      <FieldGroup 
        key={param}
        id={param}
        label={fieldsName[param]}
        type={param == 'birth_date' && 'date' || 'text' }
        value={this.state[param]}
        placeholder={this.state[param]}
        onChange={this.handleChange(param)}
      />
    );
  };

  render() {
    const { profile } = this.props;
    const birthdateString = moment(new Date(profile.birth_date)).format('YYYY-MM-DD');
    const fieldsName = {
      first_name: 'First Name',
      last_name: 'Last Name',
      birth_date: 'Birthdate',
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
              <Form horizontal onSubmit={this.handleSubmit}>
                <Row>
                  <Col  md={4} className='text-center'>
                    <FormGroup key='avatar'>
                      <Image id='img-circle-avatar' src={profile.avatar} circle/>
                      <h6>Upload a different photo</h6>
                      <input type='file' className='form-control' 
                        onChange={this.handleChangeImage} 
                        encType='multipart/form-data'/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  { Object.keys(fieldsName, profile).map(param => 
                    (param == 'birth_date') ?
                      this.datePickerFields(param, birthdateString) :
                      this.textFields(param, fieldsName)
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(profileActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
