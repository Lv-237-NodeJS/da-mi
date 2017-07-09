import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deleteCommentActions from '../../redux/commentDeleteReducers';
import CommentForm from './CommentForm';
import './Comments.scss';

export class CommentItem extends React.Component{
  constructor(props) {
    super(props);
    this.state= ({
      showForm: false,
    });
  }

  delComment = () => {
    const {eventId, giftId, comment} = this.props;
    const comment_id = comment.id;
    this.props.actions.deleteComment(eventId, giftId, comment_id);
    this.props.getComments();
  };

  getAuthor = comment => {
    const {first_name: firstName, last_name: lastName} = comment.User.Profile;
    return `${firstName} ${lastName}`;
  };

  render() {
    const date = new Date(parseInt(this.props.comment.updatedAt));
    const commentsDate = `${date.toDateString()}`;
    const {comment, author, eventId, giftId, actions, getComments} = this.props;

    return (
      <div className="comment-wrapper">
        <div className="parent">
          <div><a className="pull-right"
            label="Delete"
            onClick={this.delComment}>
            <Glyphicon glyph="remove" /></a>
          <div>
            <div className = "comment-head">
              {this.getAuthor(this.props.comment)}
            </div>
            <div className="content">
              <img className="avatar" src="{this.props.author.avatar}"  />
              <div className="message">{this.props.comment.body}</div>
              <div className="reply">
                <p> {commentsDate} | </p>
                { this.props.user ? <p> - answered to {this.props.user}. </p> : null }
                <a onClick={()=>this.setState({showForm: !this.state.showForm})}>
                  <Glyphicon glyph="share-alt" /> Reply </a>
                {
                  this.state.showForm ?
                    <CommentForm
                      user={this.getAuthor(comment)}
                      parent_id={comment.id}
                      author={author}
                      eventId={eventId}
                      giftId={giftId}
                      getComments={getComments}
                      hideForm={() => this.setState({showForm: false})} /> :
                    null
                }
              </div>
            </div>
          </div>
          {
             comment.children ? (
              <div className="children">
                {
                  this.props.comment.children.map(comment =>
                    <CommentItem
                      actions = {actions}
                      key={comment.id}
                      comment={comment}
                      author={author}
                      user={this.getAuthor(this.props.comment)}
                      getComments={getComments}
                      eventId = {eventId}
                      giftId={giftId} />
                  )
                }
              </div>
            ) : null
          }
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
