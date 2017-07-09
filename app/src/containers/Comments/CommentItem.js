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
      hovered: false
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

  showButton = (comment, author) =>
    comment.User.email == author.email &&
      this.state.hovered;

  onMouseOver = () =>
    this.setState({ hovered:true });

  onMouseOut = () =>
    this.setState({ hovered:false  });

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
    ) : null
  }

  render() {
    const {comment, author, eventId, giftId, actions,
      toUser, getComments} = this.props;
    const date = new Date(parseInt(comment.updatedAt));
    const commentsDate = `${date.toDateString()}`;

    return (
      <div className="comment-wrapper">
        <div className="parent"
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut} >
          <div><a className="pull-right"
            label="Delete"
            hidden={!this.showButton(comment, author)}
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
                {toUser ? <p> - answered to {toUser}. </p> : null }
                <a onClick={()=>this.setState({showForm: !this.state.showForm})}>
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
