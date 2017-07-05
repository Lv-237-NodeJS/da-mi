import React from 'react';
import { Button, Form, FormGroup, Col, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as inviteActions from '../../redux/inviteReducers';

const ListButton = ({...props}) => (
  <Button
    type='button'
    {...props}
    className={'modal-btn modal-input glyphicon glyphicon-' + props.className}
    bsStyle={props.className === 'trash' && 'danger' || 'success'}>
  </Button>
);

const ModalInput = ({...props}) => (
  <input
    {...props}
    type='email'
    placeholder='Enter Email'
    className='modal-input form-control'
  />
);

class GuestsModalForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      inputs: []
    };
  }
  
  addEmail = () => {
    this.state.email &&
      this.setState({
        inputs: [...this.state.inputs, this.state.email],
        email: ''
      });
  };
  
  setEmail = e => {
    this.setState({email: e.target.value});
  }

  handleChange = index => e => {
    const newEmails = this.state.inputs.map((email, emailIndex) => (
      (index !== emailIndex) && email || e.target.value
    ));
    this.setState({inputs: newEmails});
  }
  
  focusInput = index => () => {
    this[index].focus();
  }

  deleteEmail = index => () => {
    this.setState({
      inputs: this.state.inputs.filter((email, emailIndex) => index !== emailIndex)
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {actions, eventId, closeModal} = this.props;
    actions.saveEmails(this.state.inputs, eventId);
    this.setState({inputs: []});
    closeModal();
  }

  render () {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <Col xs={12} xsOffset={0} smOffset={1} sm={11}>
          <FormGroup>
            <Col xs={10}>
              <ModalInput
                value={this.state.email}
                onChange={this.setEmail}
              />
            </Col>
            <Col xs={2}>
              <ListButton
                onClick={this.addEmail}
                className='plus'
              />
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
                />
              </Col>
              <Col xs={4} sm={3} className='listItemBar'>
                <ButtonToolbar>
                  {['pencil', 'trash'].map(param =>
                    <ListButton
                      key={param}
                      onClick={param === 'pencil' && this.focusInput(index) ||
                        this.deleteEmail(index)}
                      className={param}
                    />
                  )}
                </ButtonToolbar>
              </Col>
            </FormGroup>
          )}
          <Col xsOffset={4}>
            <Button
              type='submit'
              bsStyle='primary'
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
