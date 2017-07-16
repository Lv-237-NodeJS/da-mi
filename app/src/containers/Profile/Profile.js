import React from 'react';
import { Row, Col, Image, FormGroup, ControlLabel, Form, FormControl, Button, ButtonToolbar,
  Tabs, Tab, Panel } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from 'src/redux/profileReducers';
import './profile.scss';

const FieldGroup = ({id, label, ...props}) => (
  <div>
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  </div>
);

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.profile, {
      open: true
    };
  }
  
  componentWillMount() {
    this.setState(this.props.profile);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.profile);
  }

  handleChange = stateName => e => {
    this.setState({
      [stateName]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.actions.updateProfile(this.state);
    this.setState({
      open: false
    });
  };

  dateTimeFieldHandleChange = date => {
    this.setState({
      birth_date: date
    });
  };

  handleToggle = () => 
    this.setState({
      open: !this.state.open 
    });

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
      <FormGroup key={param}>
        <Col md={12}>
          <ControlLabel>Birthdate</ControlLabel>
          <DateTimeField key={param} 
            mode='date' 
            dateTime={birthdateString}
            format={'YYYY-MM-DD'}
            inputFormat={'DD/MM/YY'}
            onChange={this.dateTimeFieldHandleChange}
          />
        </Col>
      </FormGroup>
    );
  };

  textFields = (param, fieldsName) => {
    return (
      <Col md={12} key={param}>
        <FieldGroup 
          key={param}
          id={param}
          label={fieldsName[param]}
          type='text'
          value={this.state[param]}
          placeholder={this.state[param]}
          onChange={this.handleChange(param)}
        />
      </Col>
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
          <Tabs defaultActiveKey={1} id='uncontrolled-tab'>
            <Tab eventKey={1} title='Profile Info'>
              <h1>Profile</h1>
              <Form horizontal onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={4} className='text-center'>
                    <FormGroup key='avatar'>
                      <Image id='img-circle-avatar' src={profile.avatar} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <div className='profile-display-info'>
                      <div>
                        <h4>Name: <span className='text-bold'>{`${profile.first_name || ''} ${profile.last_name || ''}`}</span></h4>
                        <h4>Birthdate: <span className='text-bold'>{birthdateString}</span></h4>
                        <h4>Address: <span className='text-bold'>{`${profile.address || ''} ${profile.city || ''} ${profile.country || ''}`}</span></h4>
                      </div>
                      <div>
                        <Button className='btn-toggle' onClick={this.handleToggle}>
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Panel collapsible expanded={this.state.open}>
                  <div className='profile-panel'>
                    <Row>
                      <Col md={5}>
                        <h6>Upload a different photo</h6>
                        <input type='file' className='form-control' 
                          onChange={this.handleChangeImage} />
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
                        <Button type='submit' className='main-button'>
                          Save Changes
                        </Button>
                      </ButtonToolbar>
                    </Row>
                  </div>
                </Panel> 
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
