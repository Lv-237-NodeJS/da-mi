import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentsActions from 'src/redux/commentsFetchReducers';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import './Comments.scss';

class Comments extends React.Component{
  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    const { eventId, giftId } = this.props;
    this.props.actions.retrieveComments(eventId, giftId);
  };

  render() {
    if (this.props.comments) {
      return (
        <div>
          <h2>Comments</h2>
          <hr/>
          <div>
            <CommentForm
              getComments={this.getComments}
              author={this.props.author}
              giftId={this.props.giftId}
              eventId={this.props.eventId} />
            <hr/>
          </div>
          <div className="comment-list">
            {
              this.props.comments.map(comment =>
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  giftId={this.props.giftId}
                  author={this.props.author}
                  getComments={this.getComments}
                  eventId = {this.props.eventId}
                />
              )
            }
            <hr/>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  comments: state.commentsList.comments
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(commentsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
