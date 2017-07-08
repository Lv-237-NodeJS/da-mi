import  React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form, Col, HelpBlock, Label } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import messages from '../../helper/messages';
import * as editEventActions from '../../redux/editEventReducers';

const InputGroupField = ({id, label, className, isErrors, ...props}) => (
  <FormGroup controlId={id} className={className}>
    <Col componentClass={ControlLabel} md={5}><br/>
      {label}
    </Col>
    <Col md={7}><br/>
      <FormControl {...props} />
    </Col>
  </FormGroup>
);

class EventsModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.event;
  }

  componentWillMount() {
    const { event } = this.props;
    this.setState(event);
  }

  handleChange = stateName => e => {
    this.setState({
      [stateName]: e.target.value
    });
  };

  dateTimeFieldHandleChange = date => {
    this.setState({
      date_event: date
    });
  };

  handleButtonClick = e => {
    const { closeModal } = this.props;
    e.preventDefault();
    this.props.editEventActions.editEvent(this.state);
    closeModal();
  };

  inputFields = (param, inputsEventData) => {
    return (
      <InputGroupField
        id={param}
        key={param}
        type="text"
        label={inputsEventData[param] + ' of your event:'}
        value={this.state[param]}
        onChange={this.handleChange(param)}
        required={(param === 'name') && true}
      />
    );
  };

  inputDateTimeFields = (param, dateEvent) => {
    return (
      <FormGroup key={param}>
        <Col md={5}><br/>
          <ControlLabel >Date of your event:</ControlLabel>
        </Col>
        <Col md={7}><br/>
          <DateTimeField 
            key={param}
            dateTime={dateEvent}
            inputFormat={'MM/DD/YY h:mm A'}
            inputProps={{readOnly:true}}
            onChange={this.dateTimeFieldHandleChange}
          />
        </Col>
      </FormGroup>
    );
  };

  render() {
    const dateEvent = this.props.event.date_event;
    const inputsEventData = {
      name: 'Name',
      date_event: 'Date',
      location_name: 'Place',
      longitude: 'Longitude',
      latitude: 'Latitude',
      description: 'Descripton'
    };
    return (
      <Form onSubmit={this.handleButtonClick}>
        {Object.keys(inputsEventData).map(param =>
          (param == 'date_event') ?
            this.inputDateTimeFields(param, dateEvent) :
            this.inputFields(param, inputsEventData)
        )}
        <FormGroup>
          <Col sm={12}>
            <Button type='submit' bsStyle='primary' bsSize='large'>
              Update
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.current
});

const mapDispatchToProps = dispatch => ({
  editEventActions: bindActionCreators(editEventActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsModalForm);
