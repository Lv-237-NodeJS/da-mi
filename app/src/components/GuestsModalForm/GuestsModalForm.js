import React from 'react';
import { Button, Form, FormGroup, Col, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
<<<<<<< 9b7a3f40be421c92b72a5c489fcb00efc1fad036
import * as inviteActions from '../../redux/inviteReducers';
=======
import * as inviteActions from '../../redux/invite';
>>>>>>> Added guests modal window

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
  
<<<<<<< 9b7a3f40be421c92b72a5c489fcb00efc1fad036
  addEmail = () => {
    this.state.email &&
      this.setState({
        inputs: [...this.state.inputs, this.state.email],
        email: ''
      });
=======
  add = () => {
  this.state.email &&
    this.setState({
      inputs: [...this.state.inputs, this.state.email],
      email: ''
    });
>>>>>>> Added guests modal window
  };
  
  setEmail = e => {
    this.setState({email: e.target.value});
  }

  handleChange = index => e => {
<<<<<<< 9b7a3f40be421c92b72a5c489fcb00efc1fad036
    const newEmails = this.state.inputs.map((email, emailIndex) => (
      (index !== emailIndex) && email || e.target.value
=======
    const newEmails = this.state.inputs.map((email, j) => (
      (index !== j) && email || e.target.value
>>>>>>> Added guests modal window
    ));
    this.setState({inputs: newEmails});
  }
  
  focusInput = index => () => {
    this[index].focus();
  }

  deleteEmail = index => () => {
    this.setState({
<<<<<<< 9b7a3f40be421c92b72a5c489fcb00efc1fad036
      inputs: this.state.inputs.filter((email, emailIndex) => index !== emailIndex)
=======
      inputs: this.state.inputs.filter((input, j) => index !== j)
>>>>>>> Added guests modal window
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
<<<<<<< 9b7a3f40be421c92b72a5c489fcb00efc1fad036
                onClick={this.addEmail}
=======
                onClick={this.add}
>>>>>>> Added guests modal window
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
<<<<<<< 9b7a3f40be421c92b72a5c489fcb00efc1fad036
              <Col xs={4} sm={3} className='listItemBar'>
=======
              <Col xs={4}  sm={3} className='listItemBar'>
>>>>>>> Added guests modal window
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
<<<<<<< 9b7a3f40be421c92b72a5c489fcb00efc1fad036
=======
              className='modal-save-button'
>>>>>>> Added guests modal window
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
