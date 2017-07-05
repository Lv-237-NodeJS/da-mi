import React from 'react';
import { Grid, Row, Col, PageHeader, FormGroup, FormControl, Button,
  Form, HelpBlock  } from 'react-bootstrap';
import { Maps } from '../../components';
import { messages, API, CONTACTDATA } from '../../helper';
import request from '../../helper/request';
import './Contacts.scss';

let FieldGroup = ({className, isErrors, id, ...props}) => (
  <Col xs={12} sm={12} md={12}>
   <div>
   <FormGroup className = {className} id = {id}>
      <FormControl {...props} />
      {isErrors && <HelpBlock>{isErrors}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
   </div>
  </Col>
);

export default class Contacts extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      surname: '',
      textarea: '',
      isErrors: {
        email: null,
        textarea: null
      },
       enableButton: false
    };
  }

  handleChange = param => e => {
    let value = e.target.value;
    this.setState({[param]: value},
      () => {this.validateField(param);});
  };

  validateField = (param) => {
    const pattern = {
      email: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
      textarea: /.{4,}/
    };
    const newState = this.state;
    const validateByPattern = name => {
      newState.isErrors[name] = !newState[name].match(pattern[name]) && 
      messages[name + 'Error'] || '';
    };

    validateByPattern(param) && newState.isErrors[param] !== null;

    newState.enableButton = Object.keys(newState.isErrors).map(key => 
      newState.isErrors[key]).every(element => element === '');
    this.setState(newState);
  }  
  

  handleButtonClick = e => {
    e.preventDefault();
    const newState = this.state;
    let data = {
      name: newState.name,
      surname: newState.surname,
      email: newState.email,
      textarea: newState.textarea
    };
    request()
    .post(API.HOST + API.PORT + '/api/support')
    .send(data)
    .end(function(err, res) {
      return (err || !res.ok)&&(messages.noConnection) || (messages.sendMessage);
    })
  }

  render() {
    const inputsName = {
      name: 'Name',
      surname: 'Surname',
      email: 'Email',
      textarea: 'Textarea'
    };
    return (
      <Grid>
        <PageHeader className='text-center'>Contacts us</PageHeader>
        <Row className='show-grid'>
          <Col xs={12} sm={12} md={12} className='text-center'>
            <h2>Da-Mi</h2>
          </Col>
        </Row>
        <Row className='contact'>
          <Col xs={6} sm={6} md={6} className='text-right'>
            <div className='mainText'> 
              <p>{CONTACTDATA.MANADGER1}</p>
              <p>{CONTACTDATA.MANADGER2}</p>
              <p>{CONTACTDATA.POST}</p>
              <p>{CONTACTDATA.ADDRESS}</p>
            </div>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <div> 
              <p>
                <span className='glyphicon glyphicon-phone'/>{CONTACTDATA.PHONE1}
              </p>
              <p>
                <span className='glyphicon glyphicon-phone'/>{CONTACTDATA.PHONE2}
              </p>
              <p>
                <span className='glyphicon glyphicon-envelope'/>{CONTACTDATA.MAIL}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
        <Col xs={12} sm={6} md={6}>
        <Form onSubmit={this.handleButtonClick}>
          { Object.keys(inputsName).map(param =>
            <FieldGroup
              id={param}
              key={param}
              className={!!this.state.isErrors[param] && 'has-error'}
              label={inputsName[param]}
              type={param === 'email' && param || 'text'}
              name={param}
              isErrors={this.state.isErrors[param]}
              onChange={this.handleChange(param)}
              value={this.state.param}
              placeholder={inputsName[param]}
              componentClass={param === 'textarea' && param || 'input'}
            />
          )}
        <Col xs={12} sm={12} md={12} className='text-center'> 
        <Button 
          className='btn btn-primary'
          type='submit'
          disabled = {!this.state.enableButton}>Send message
        </Button>
        </Col>
        </Form>
        </Col>
          <Col xs={12} sm={6} md={6} className='map'>
            <Maps />
          </Col>
        </Row>
      </Grid>
    );
  }
}
