import React from 'react';
import { FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as createCommentActions from 'src/redux/commentCreateReducers';
import { messages } from 'src/helper';
import './Comments.scss';

export class CommentForm extends React.Component{
  constructor(props) {
    super(props);
    this.state=({
      body: '',
      parent_id: null,
    });
  }

  inputValid = () => this.state.body.trim().length < 150;

  formSubmit = e => {
    e.preventDefault();
    const {eventId, giftId, parent_id, getComments, hideForm, actions} = this.props;
    const commentData = {
      body: this.state.body,
      parent_id: parent_id
    };    
    actions.createComment(eventId, giftId, commentData);
    getComments();
    hideForm && hideForm() || null;
    this.setState({
      body: '',
      parent_id: null
    });
  }

  render() {
    const error = this.state.body && !this.inputValid() && messages.maxTextLength || '';
    const {first_name: firstName, avatar, last_name: lastName} = this.props.author;

    return (
      <div className="comment-wrapper">
        <div className = "comment-head">{`${firstName} ${lastName}`}</div>
        <div className="content">
          <img className="avatar" src={avatar} />
          <div className="message">
            <FormGroup className="messageBox" controlId="formControlsTextarea">
              <FormControl
                componentClass="textarea"
                placeholder="Comment something..."
                value={this.state.body}
                onInput={(e) => this.setState({body: e.target.value})} />
            </FormGroup>
            <span className="error-message">{error}</span>
            <Button
              label="Comment"
              type='button'
              disabled={!this.state.body || !this.inputValid()}
              style={{float: 'right'}}
              onClick={this.formSubmit}>Send
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comment: state.comment
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(createCommentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
