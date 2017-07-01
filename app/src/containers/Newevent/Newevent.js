import  React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form, Col, HelpBlock, Label } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as showActions from '../../redux/newEventReducers';
import messages from '../../helper/messages';

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

class newEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
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

  getValidationState = fieldName => {
    
  };

  handleChange = param => e => {
    let value = e.target.value.trim();
    this.setState({ [param]: value},
      () => {this.getValidationState(param);});
  };

  dateTimeFieldHandleChange = e => {
    const date = new Date(parseInt(e));
     this.setState({
      date_event: date
    });
  };

  handleButtonClick = e => {
   e.preventDefault();
    this.props.actions.createNewEvent(this.state);
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
            (param == 'date_event') ?
             <DateTimeField
                key={param}
                value={this.state.param}
                onChange={this.dateTimeFieldHandleChange}
             />     
            :
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
  }
}

const mapStatetoProps = state => ({
  newevent: state.newevent
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(showActions, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(newEvent);
