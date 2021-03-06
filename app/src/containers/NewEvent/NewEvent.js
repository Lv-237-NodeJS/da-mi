import  React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form,
  Col, HelpBlock, Label } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeField from 'react-bootstrap-datetimepicker';
import * as showActions from './newEventActions';
import { ModalWindow } from 'src/components';
import { messages } from 'src/helper';

const InputGroupField = ({id, label, className, isErrors, ...props}) => (
  <FormGroup controlId={id} className={className}>
    <Col componentClass={ControlLabel} md={3}><br/>
      {label}
    </Col>
    <Col md={9}><br/>
      <FormControl {...props} />
      {isErrors && <HelpBlock>{isErrors}</HelpBlock>}
      <FormControl.Feedback />
    </Col>
  </FormGroup>
);

class newEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date_event: new Date(),
      location_name: null,
      longitude: null,
      latitude: null,
      description: null,
      isErrors: {
        name: null
      },
      enableButton: false,
      showModal: false,
    };
  }

  getValidationState = () => {
    const newState = this.state;
    if (this.state.name.length < 4) {
      newState.enableButton = false;
      newState.isErrors.name = messages['nameError'];
    } else {
      newState.isErrors.name = null;
      newState.enableButton = true;
    }
    this.setState(newState);
  };

  handleChange = param => e => {
    const value = e.target.value.trim();
    this.setState({
      [param]: value}, () => {this.getValidationState();
    });
  };

  dateTimeFieldHandleChange = date => {
    const parsedDate = new Date(parseInt(date));
    this.setState({
      date_event: parsedDate
    });
  };

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  handleButtonClick = e => {
    e.preventDefault();
    this.props.actions.createNewEvent(this.state);
    this.toggleModal();
  };

  inputFields = (param, inputsEventData) => {
    return (
      <InputGroupField
        id={param}
        key={param}
        type="text"
        className={!!this.state.isErrors[param] && 'has-error'}
        label={inputsEventData[param] + ' of your event:'}
        placeholder={inputsEventData[param]}
        value={this.state.param}
        onChange={this.handleChange(param)}
        isErrors={this.state.isErrors[param]} />
    );
  };

  inputDateTimeFields = param => {
    return (
      <FormGroup key={param}>
        <Col md={3}><br/>
          <ControlLabel>Date of your event:</ControlLabel>
        </Col>
        <Col md={9} className='dateTimePickerField'><br/>
          <DateTimeField
            key={param}
            dateTime={this.state.param}
            inputProps={{readOnly:true}}
            onChange={this.dateTimeFieldHandleChange} />
        </Col>
      </FormGroup>
    );
  };

  render() {
    const inputsEventData = {
      name: 'Name',
      date_event: 'Date',
      location_name: 'Place',
      longitude: 'Longitude',
      latitude: 'Latitude',
      description: 'Descripton'
    };

    const formInputs = (
      <Form onSubmit={this.handleButtonClick}>
        {Object.keys(inputsEventData).map(param =>
          (param == 'date_event') ?
            this.inputDateTimeFields(param) :
            this.inputFields(param, inputsEventData)
        )}
        <FormGroup>
          <Col md={12}>
            <hr/>
            <Button type='submit' className='main-button' disabled={!this.state.enableButton}>
              Save
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );

    return (
      <ModalWindow
        title = {'Create your own event:'}
        bsStyle = {'info'}
        buttonName = {'Create New Event'}
        buttonClassName = {'main-button'}
        styleName = {'createEventModal'}
        body = {formInputs}
        toggleModal = {this.toggleModal} showModal = {this.state.showModal}
      />
    );
  }
}

const mapStatetoProps = state => ({
  newevent: state.newevent
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(showActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(newEvent);
