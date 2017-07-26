import  { API, request }  from 'src/helper';
import { SHOW_ALERT, MESSAGE_ALERT, VIEW_ALERT, showAlert,
  messageAlert, messageView, showResponseMessage } from 'src/components/Alerts/AlertsActions';

const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';
const RETRIEVE_COMMENTS_SUCCESS = 'RETRIEVE_COMMENTS_SUCCESS';
const RETRIEVE_COMMENTS_FAILURE = 'RETRIEVE_COMMENTS_FAILURE';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

const createCommentSuccess = res => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: res.body
});

const createCommentFail = err => ({
  type: CREATE_COMMENT_FAILURE,
  payload: err
});

const retrieveCommentsSuccess = res => ({
  type: RETRIEVE_COMMENTS_SUCCESS,
  payload: res.body.data
});

const retrieveCommentsFail = err => ({
  type: RETRIEVE_COMMENTS_FAILURE,
  payload: err
});

const deleteCommentSuccess = res => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: res.body.message
});

const deleteCommentFail = err => ({
  type: DELETE_COMMENT_FAILURE,
  payload: err
});

export const retrieveComments = (eventId, giftId) =>
  dispatch => request()
    .get(`${API.URL}/api/event/${eventId}/gift/${giftId}/comments`)
    .end((err, res) => err &&
      dispatch(retrieveCommentsFail(err)) ||
      dispatch(retrieveCommentsSuccess(res)));

export const createComment = (eventId, giftId, commentData) =>
  dispatch => request()
    .post(`${API.URL}/api/event/${eventId}/gift/${giftId}/comments`)
    .send(commentData)
    .end((err, res) => err &&
      dispatch(createCommentFail(err)) ||
      dispatch(createCommentSuccess(res)));

export const deleteComment = (eventId, giftId, comment_id) =>
  dispatch => request()
    .delete(`${API.URL}/api/event/${eventId}/gift/${giftId}/comment/${comment_id}`)
    .end((err, res) => {
      showResponseMessage(dispatch, res);
      err && dispatch(deleteCommentFail(err)) ||
      dispatch(deleteCommentSuccess(res));
    });
