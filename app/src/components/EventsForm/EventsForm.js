import  React from 'react';
import { FormGroup, ControlLabel, FormControl, ButtonToolbar, Button,
  Form, Col, HelpBlock, Label } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editEventActions from './editEventActions';
import { ModalWindow } from 'src/components';

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

class EventsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.event,
      showModal: false,
    };
  }
  
  inputsEventData = {
    name: 'Name',
    date_event: 'Date',
    location_name: 'Place',
    longitude: 'Longitude',
    latitude: 'Latitude',
    description: 'Descripton'
  };

  handleChange = stateName => e => {
    this.setState({[stateName]: e.target.value});
  };

  dateTimeFieldHandleChange = date => {
    this.setState({date_event: date});
  };

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  handleButtonClick = e => {
    const {event: {id}} = this.props;
    const event = this.state;
    this.props.editEventActions.editEvent(id, event);
    this.toggleModal();
    e.preventDefault();
  };

  inputFields = (param, inputsEventData) => {
    const {event} = this.props;
    return (
      <InputGroupField
        id={param}
        key={param}
        type="text"
        placeholder = {this.inputsEventData[param]}
        label={this.inputsEventData[param] + ' of your event:'}
        value={this.state[param] || event[param] || ''}
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
        <Col md={7} className='dateTimePickerField'><br/>
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
    const formInputs = (
      <Form onSubmit={this.handleButtonClick}>
        {Object.keys(this.inputsEventData).map(param =>
          (param == 'date_event') ?
            this.inputDateTimeFields(param, dateEvent) :
            this.inputFields(param, this.inputsEventData)
        )}
        <div>
          <ButtonToolbar>
            <hr/>
            <Button type='submit' className='main-button'>
              Update
            </Button>
          </ButtonToolbar>
        </div>
      </Form>
    );

    return (
      <ModalWindow
        title = {'Here, you can update your own event:'}
        buttonName={'Edit'}
        bsStyle = {'info'}
        styleName = {'editEventModal'}
        body = {formInputs}
        toggleModal = {this.toggleModal} showModal = {this.state.showModal}
      />
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.current
});

const mapDispatchToProps = dispatch => ({
  editEventActions: bindActionCreators(editEventActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsForm);
