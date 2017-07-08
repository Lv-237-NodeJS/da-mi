import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deleteCommentActions from '../../redux/commentDeleteReducers';
import CommentForm from './CommentForm';
import getAuthor from './../../helper/getAuthor';
import './Comments.scss';

export class CommentItem extends React.Component{
  constructor(props){
    super(props);
    this.state= ({
      showForm: false,
    });
  }

  delComment = () => {
    const { eventId, giftId, comment } = this.props;
    const comment_id = comment.id;
    this.props.actions.deleteComment(eventId, giftId, comment_id);
    this.props.getComments();
  };

  render(){
    const date = new Date(parseInt(this.props.comment.updatedAt));
    const commentsDate = `${ date.toDateString() }`;

    return (
      <div className="comment-wrapper">
        <div className="parent">
          <div><a className="pull-right"
            label="Delete"
            onClick={ this.delComment }>
            <Glyphicon glyph="remove" /></a>
          <div>
            <div className = "comment-head">
              { getAuthor(this.props.comment) }
            </div>
            <div className="content">
              <img className="avatar" src="{ this.props.author.avatar }"  />
              <div className="message">{ this.props.comment.body }</div>
              <div className="reply">
                { this.props.user }<p> { commentsDate } | </p>
                <a onClick={()=>this.setState({ showForm: !this.state.showForm })}>
                  <Glyphicon glyph="share-alt" /> Reply </a>
                {
                  this.state.showForm ?
                    <CommentForm
                      user={ getAuthor(this.props.comment) }
                      parent_id={ this.props.comment.id }
                      author={ this.props.author }
                      eventId={ this.props.eventId }
                      giftId={ this.props.giftId }
                      getComments={ this.props.getComments }
                      hideForm={ () => this.setState({ showForm: false }) }/> :
                    null
                }
              </div>
            </div>
          </div>
          {
            this.props.comment.children ? (
              <div className="children">
                {
                  this.props.comment.children.map(comment =>
                    <CommentItem
                      actions = { this.props.actions }
                      key={ comment.id }
                      comment={ comment }
                      author={ this.props.author }
                      getComments={ this.props.getComments }
                      eventId = { this.props.eventId }
                      giftId={ this.props.giftId } />
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
