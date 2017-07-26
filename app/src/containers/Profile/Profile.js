import React from 'react';
import { Row, Col, Image, FormGroup, ControlLabel, Form, FormControl, Button, ButtonToolbar,
  Tabs, Tab, Panel } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import { FileUploader, ModalWindow } from 'src/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from './profileActions';
import * as fileUploaderAcions from 'src/components/FileUploader/fileUploaderActions';
import './profile.scss';
import { Alerts, ResetPassword } from 'src/components';

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
    this.state = {
      profile: this.props.profile,
      showModal: false,
    };
  }

  componentWillMount() {
    this.setState({profile: this.props.profile});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({profile: nextProps.profile});
  }

  handleChange = stateName => e => {
    this.setState({
      profile: {[stateName]: e.target.value}
    });
  };

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  handleSubmit = e => {
    const {profile: {profile_id}, profile: {avatar}, actions, fileUrl} = this.props;
    e.preventDefault();
    actions.updateProfile({...this.state.profile, avatar: fileUrl || avatar});
    actions.retrieveProfile(profile_id);
    this.toggleModal();
  };

  dateTimeFieldHandleChange = date => {
    this.setState({
      profile: {birth_date: date}
    });
  };

  datePickerFields = (param, birthdateString) => {
    return (
      <FormGroup key={param}>
        <Col md={12} >
          <ControlLabel>Birthdate</ControlLabel>
          <div className='dateInput'>
            <DateTimeField key={param}
              mode='date'
              dateTime={birthdateString}
              format={'YYYY-MM-DD'}
              inputFormat={'DD/MM/YY'}
              onChange={this.dateTimeFieldHandleChange}
            />
          </div>
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
          value={this.state.profile[param] || ''}
          placeholder={this.props.profile[param]}
          onChange={this.handleChange(param)}
        />
      </Col>
    );
  };

  render() {
    const { profile } = this.props;
    const birthdateString = moment(profile.birth_date).format('YYYY-MM-DD');
    const fieldsName = {
      first_name: 'First Name',
      last_name: 'Last Name',
      birth_date: 'Birthdate',
      address: 'Address',
      city: 'City',
      country: 'Country'
    };

    const formInputs = (
      <Form horizontal onSubmit={this.handleSubmit}>
        <div className='profile-panel'>
          <Row>
            <FileUploader avatar={profile.avatar} />
          </Row>
          <Row>
            { Object.keys(fieldsName, profile).map(param =>
              (param == 'birth_date') ?
                this.datePickerFields(param, birthdateString) :
                this.textFields(param, fieldsName)
            )}
          </Row>
          <hr/>
        </div>
        <Row>
          <ButtonToolbar>
            <Button type='submit' className='main-button' onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </ButtonToolbar>
        </Row>
      </Form>
    );

    return (
      <div className='profile-details'>
        <Alerts />
        <Col sm={8} className='container'>
          <Tabs defaultActiveKey={1} id='uncontrolled-tab'>
            <Tab eventKey={1} title='Profile Info'>
              <h1>Profile</h1>
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
                      <ModalWindow
                        title = {'Update your profile:'}
                        bsStyle = {'info'}
                        buttonClassName = {'main-button'}
                        buttonName = {'Edit Profile'}
                        styleName = {'profileModal'}
                        toggleModal = {this.toggleModal} showModal = {this.state.showModal}
                        body = {formInputs}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey={2} title='Security Settings'>
              <ResetPassword />
            </Tab>
          </Tabs>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.data,
  fileUrl: state.fileUploader.fileUrl.url
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(profileActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
