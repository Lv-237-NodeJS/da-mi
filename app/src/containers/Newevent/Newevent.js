import  React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form, Col, HelpBlock, Label } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from '../../redux/createNewEventReducer';

const messages = {
  nameError: 'The name of your event must have minimum 4 letters',
  date_eventError: 'Date of your event must be like this: dd/mm/yyyy'
}

let InputGroup = ({id, label, className, isErrors, ...props}) => (
  <FormGroup controlId={id} className = {className}>
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

class Newevent extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      name: null,
      date_event: null,
      location_name: null,
      longitude: null,
      latitude: null,
      description: null,
      isErrors: {
        name: null,
        date_event: null
      },
      enableButton: false
    };
  }

  getValidationState = fieldName => {
    const pattern = {
      name: /^.{4,}$/,
      date_event:  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    };

    const newState = this.state;
    const validateByPattern = name => {
      newState.isErrors[name] = !newState[name].match(pattern[name]) &&
      messages[name + 'Error'] || '';
    };

    validateByPattern(fieldName);

    newState.enableButton = Object.keys(newState.isErrors).map(key =>
      newState.isErrors[key]).every(element => element === '');
    this.setState(newState);
  };

  handleChange = param => e => {
    let value = e.target.value.trim();
    this.setState({ [param]: value},
      () => {this.getValidationState(param);});
  };

  handleButtonClick = e => {
    e.preventDefault();
    this.props.actions.createNewEvent(
      this.state.name,
      this.state.date_event,
      this.state.location_name,
      this.state.longitude,
      this.state.latitude,
      this.state.description
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
      <Label bsStyle='success'>Here, you can create your own event:</Label>
      <Form onSubmit={this.handleButtonClick}>
      { Object.keys(inputsEventData).map(param =>
        <InputGroup
          id={param}
          key={param}
          type="text"
          className={!!this.state.isErrors[param] && 'has-error'}
          label={inputsEventData[param] + ' of your event:'}
          placeholder={inputsEventData[param]}
          value={this.state.param}
          onChange={this.handleChange(param)}
          isErrors={this.state.isErrors[param]}
        />
         )}
          <FormGroup>
            <Col>
             <Button type='submit' bsStyle='primary' bsSize='large' disabled = {!this.state.enableButton}>
               Save
             </Button>
            </Col>
          </FormGroup>
      </Form>
      </Col>
    );
  };
};

const mapStatetoProps = state => ({
   newevent: state.newevent
});

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators(showActions, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Newevent);
