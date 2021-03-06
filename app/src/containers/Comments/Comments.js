import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from './commentActions';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import './Comments.scss';

class Comments extends React.Component{
  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    const {eventId, giftId} = this.props;
    this.props.actions.retrieveComments(eventId, giftId);
  };

  render() {
    const {author, eventId, giftId, comments} = this.props;
    if (comments) {
      return (
        <div>
          <h4>Comments</h4>          
          <div>
            <CommentForm
              getComments={this.getComments}
              author={author}
              giftId={giftId}
              eventId={eventId}
            />            
          </div>
          <div className="comment-list">
            {
              this.props.comments.map(comment => {
                return giftId == comment.gift_id ? (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    giftId={giftId}
                    author={author}
                    getComments={this.getComments}
                    eventId = {eventId}
                  /> ): null;
              })
            }
            <hr/>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  comments: state.comments.comments
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(commentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
