import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deleteCommentActions from 'src/redux/commentDeleteReducers';
import CommentForm from './CommentForm';
import moment from 'moment';
import './Comments.scss';

export class CommentItem extends React.Component{
  constructor(props) {
    super(props);
    this.state= ({
      showForm: false,      
    });
  }
  
  delButton = (comment, author) =>
    comment.User.email == author.email;

  delComment = () => {
    const {eventId, giftId, actions, comment, getComments} = this.props;
    const comment_id = comment.id;
    actions.deleteComment(eventId, giftId, comment_id);
    getComments();
  };

  getAuthor = comment => {
    const {first_name: firstName, last_name: lastName} = comment.User.Profile;
    return `${firstName} ${lastName}`;
  };

  subComments = (comment) => {
    const {author, eventId, giftId, actions,
      toUser, getComments} = this.props;
    return comment.children ? (
      <div className="children">
        {
          comment.children.map(comment =>
            <CommentItem
              actions = {actions}
              key={comment.id}
              comment={comment}
              author={author}
              toUser={this.getAuthor(this.props.comment)}
              getComments={getComments}
              eventId = {eventId}
              giftId={giftId}
            />
          )
        }
      </div>
    ) : null;
  }

  render() {
    const {comment, comment:{User:{Profile}}, author, eventId, giftId, actions,
      toUser, getComments} = this.props;
    const commentsDate = moment(comment.updatedAt, 'x').format('DD MMM YYYY hh:mm a');
    const avatarData = Profile.avatar || '';
    
    return (
      <div className="comment-wrapper">
        <div className="parent">
          <div>
            <div className ="comment-head">
              {this.getAuthor(comment)}
            </div>
            <div className="content">
              <img className="avatar" src={avatarData} />
              <div className="message">{comment.body}</div>
              <div className="pull-right">
                <a
                  label="Delete"
                  hidden={!this.delButton(comment, author)}
                  onClick={this.delComment}>
                  <Glyphicon glyph="remove" />
                </a>
              </div>
              <div className="reply">
                <span className="dateComment">{commentsDate}</span>
                {toUser ? <span className="details">| answered to {toUser}.</span> : null }
                <a className="details" onClick={()=>this.setState({showForm: !this.state.showForm})}>
                  <Glyphicon glyph="share-alt" /> Reply </a>
                {
                  this.state.showForm ?
                    <CommentForm
                      toUser={this.getAuthor(comment)}
                      parent_id={comment.id}
                      author={author}
                      eventId={eventId}
                      giftId={giftId}
                      getComments={getComments}
                      hideForm={() => this.setState({showForm: false})}
                    /> : null
                }
              </div>
            </div>
            {this.subComments(comment)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  deletedComment: state.deletedComment
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(deleteCommentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
