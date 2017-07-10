import React from 'react';
import { Button, Form, FormGroup, Col, ButtonToolbar, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { messages } from 'src/helper';
import * as inviteActions from 'src/redux/inviteReducers';

const ListItemButton = ({...props}) => (
  <Button
    type='button'
    {...props}
    className={`modal-btn modal-input glyphicon glyphicon-${props.className}`}
    bsStyle={(props.className === 'trash' || props.className === 'remove') &&
            'danger' || 'success'}>
  </Button>
);

const ModalInput = ({...props}) => (
  <div className='modal-input-container'>
    <input
      {...props}
      type='email'
      placeholder='Enter Email'
      className='modal-input form-control' />
    {props['data-error'] && <HelpBlock>{props['data-error']}</HelpBlock>}
  </div>
);

class GuestsModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      inputs: [],
      initialEmail: '',
      key: null,
      error: null
    };
  }
  
  handleClickOutside = e => {
    !e.target.className.includes('modal-list') &&
    e.target.parentNode.className !== 'btn-toolbar' && this.setState({key: null});
  };

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
  
  validateEmail = email => {
    const pattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const validEmail = email.match(pattern);
    const error = !validEmail && messages.emailError || null;
    this.setState({error});
  }

  appendEmail = () => {
    this.state.email &&
      this.setState({
        inputs: [...this.state.inputs, this.state.email],
        email: ''
      });
  };
  
  setEmail = e => {
    const email = e.target.value;
    this.setState({email}, this.validateEmail(email));
  };

  handleChange = index => e => {
    const newEmails = this.state.inputs.map((email, emailIndex) => (
      index !== emailIndex ? email: e.target.value
    ));
    
    this.setState({inputs: newEmails});
  };
  
  focusInput = index => () => {
    this.setState({
      initialEmail: this.state.inputs[index],
      key: index
    });
    this[index].focus();
  };

  deleteEmail = index => () => {
    this.setState({
      inputs: this.state.inputs.filter((email, emailIndex) => index !== emailIndex)
    });
  };

  acceptEdition = () => {
    this.setState({key: null});
  };

  discardEdition = index => () => {
    const newState = this.state;
    newState.inputs[index] = this.state.initialEmail;
    newState.key = null;
    this.setState(newState);
  };

  handleSubmit = e => {
    e.preventDefault();
    const {actions, eventId, closeModal} = this.props;
    actions.saveEmails(this.state.inputs, eventId);
    this.setState({inputs: []});
    closeModal();
  };

  render() {
    const checkEditingItem = index => this.state.key == index && true || false;
    const getButtonsSet = index => ({
      default: {
        pencil: this.focusInput(index),
        trash: this.deleteEmail(index)
      },
      edit: {
        ok: this.acceptEdition,
        remove: this.discardEdition(index)
      }
    });
    const selectButtons = index => 
      checkEditingItem(index) && getButtonsSet(index).edit || getButtonsSet(index).default;

    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <Col xs={12} xsOffset={0} smOffset={1} sm={11}>
          <FormGroup>
            <Col xs={10}>
              <ModalInput
                value={this.state.email}
                onChange={this.setEmail}
                data-error={this.state.error} />
            </Col>
            <Col xs={2}>
              <ListItemButton
                onClick={this.appendEmail}
                className='ok' />
            </Col>
          </FormGroup>
          
          {this.state.inputs.map((email, index) =>
            <FormGroup key={index}>
              <Col xs={8} sm={9}>
                <input
                  type='email'
                  value={email}
                  placeholder='Enter Email'
                  className='modal-input modal-list form-control'
                  ref={input => this[index] = input}
                  onChange={this.handleChange(index)}
                  onClick={this.focusInput(index)} />
              </Col>
              <Col xs={4} sm={3} className='listItemBar'>
                <ButtonToolbar>
                  {Object.keys(selectButtons(index)).map(param =>
                    <ListItemButton
                      key={param}
                      onClick={selectButtons(index)[param]}
                      className={param} />
                  )}
                </ButtonToolbar>
              </Col>
            </FormGroup>
          )}
          <Col xsOffset={4}>
            <Button
              className='main-button'
              type='submit'
              bsSize='large'>Save</Button>
          </Col>
        </Col>
      </Form>
    );
  }
}

const mapStatetoProps = state => ({
  guests: state.invite.guests
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(inviteActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(GuestsModalForm);
