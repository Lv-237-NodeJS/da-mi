import React from 'react';
import { FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as createCommentActions from '../../redux/commentCreateReducers';
import messages from '../../helper/messages';
import getAuthor from './../../helper/getAuthor';
import './Comments.scss';

export class CommentForm extends React.Component{

  constructor(props){
    super(props);
    this.state=({
      body: '',
      parent_id: null,
    });
  }

  inputValid = () => this.state.body.trim().length < 150;

  formSubmit = e => {
    e.preventDefault();

    const commentData = {
      body: this.state.body,
      parent_id: this.props.parent_id
    };
    const { eventId, giftId} = this.props;
    this.props.actions.createComment(eventId, giftId, commentData);
    this.props.getComments();
    this.props.hideForm && this.props.hideForm() || null;

    this.setState({
      body: '',
      parent_id: null
    });
  }

  render(){

  	const error = this.state.body && !this.inputValid() &&
      messages.maxTextLength || '';
    const { firstName, lastName } = this.props.author;

    return (
      <div className="comment-wrapper">
        <div className = "comment-head">{`${firstName} ${lastName}`}</div>
        <div className="content">
          <img className="avatar" src={ this.props.author.avatar } />
          <div className="message">
            <FormGroup className="messageBox" controlId="formControlsTextarea">
              <FormControl
                componentClass="textarea"
                placeholder="Comment something..."
                value={ this.state.body }
                onInput={ (e) => this.setState({ body: e.target.value }) } />
            </FormGroup>
            <span className="error-message">{ error }</span>
            <Button
              label="Comment"
              type='button'
              disabled={ !this.state.body || !this.inputValid() }
              style={{ float: 'right' }}
              onClick={ this.formSubmit }>Send
            </Button>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  comment: state.comment
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(createCommentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
