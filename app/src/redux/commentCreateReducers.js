const COMMENT_CREATED = 'COMMENT_CREATED';
const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';
import  { API }  from './../helper/constants';
import request from './../helper/request';

export const createComment = (eventId, giftId, commentData) => {  
  return dispatch => {
    return request()
      .post(API.URL + `/api/event/${eventId}/gift/${giftId}/comments`)
      .send(commentData)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: CREATE_COMMENT_FAILURE,
            payload: err,
          });
        } else {
          dispatch({
            type: COMMENT_CREATED,
            payload: res.body,
          });         
        }
      })
      
  };
};

export const createCommentReducer = (state = {comment: {}}, action) => {
  switch (action.type) {    
    case COMMENT_CREATED: {
      return {
        ...state,
        comment: action.payload,
      };
    }
    case CREATE_COMMENT_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: return state;
  }
};

export default createCommentReducer;
