import  React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form, Col, HelpBlock, Label } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeField from 'react-bootstrap-datetimepicker';
import * as showActions from 'src/redux/newEventReducers';
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
      enableButton: false
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

  handleButtonClick = e => {
    e.preventDefault();
    this.props.actions.createNewEvent(this.state);
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
    return (
      <Col sm={9}>
        <h2>Here, you can create your own event:</h2>
        <Form onSubmit={this.handleButtonClick}>
          {Object.keys(inputsEventData).map(param =>
            (param == 'date_event') ?
              this.inputDateTimeFields(param) : 
              this.inputFields(param, inputsEventData)
          )}
          <FormGroup>
            <Col>
              <Button type='submit' className='main-button' bsSize='large' disabled={!this.state.enableButton}>
              Save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}

const mapStatetoProps = state => ({
  newevent: state.newevent
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(showActions, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(newEvent);
