import React from 'react';
import { FormGroup, FormControl, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from './commentActions';
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
        <div className = "comment-head">
          <span>{`${firstName} ${lastName}`}</span>
          <span className="error-message">{error}</span>
        </div>  
        <div className="content">
          <img className="avatar" src={avatar} />
          <div className="messageBox">
            <FormGroup controlId="formControlsTextarea">
              <FormControl className="message"
                componentClass="textarea"
                placeholder="Comment something..."
                value={this.state.body}
                onInput={(e) => this.setState({body: e.target.value})} />
            </FormGroup>
            <div>
              <a 
                label="Comment"
                hidden={!this.state.body || !this.inputValid()}
                className="pull-right"
                onClick={this.formSubmit}>COMMENT
              </a>
            </div>
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
  actions: bindActionCreators(commentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
