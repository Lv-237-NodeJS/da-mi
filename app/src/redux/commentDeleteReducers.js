import  { API, request }  from 'src/helper';

const COMMENT_DELETED = 'COMMENT_DELETED';
const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const deleteComment = (eventId, giftId, comment_id) => dispatch =>
  request()
    .delete(`${API.URL}/api/event/${eventId}/gift/${giftId}/comment/${comment_id}`)
    .end((err, res) => err &&
        dispatch({
          type: DELETE_COMMENT_FAILURE,
          payload: err,
        }) ||
        dispatch({
          type: COMMENT_DELETED,
          payload: res.body,
        }));

export const deleteCommentReducer = (state = { commentDeleted: {} }, action) => {
  switch (action.type) {
    case COMMENT_DELETED: {
      return {
        ...state,
        commentDeleted: action.payload,
      };
    }

    case DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: return state;
  }
};

export default deleteCommentReducer;
