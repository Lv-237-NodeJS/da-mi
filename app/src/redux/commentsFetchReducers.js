const RETRIEVE_COMMENTS = 'RETRIEVE_COMMENTS';
const RETRIEVE_COMMENTS_SUCCESS = 'RETRIEVE_COMMENTS_SUCCESS';
const RETRIEVE_COMMENTS_FAILURE = 'RETRIEVE_COMMENTS_FAILURE';
import  { API }  from './../helper/constants';
import request from './../helper/request';

export const retrieveComments = (eventId, giftId) => {
  return dispatch => {
    return request()
      .get(API.URL + `/api/event/${eventId}/gift/${giftId}/comments`)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: RETRIEVE_COMMENTS_FAILURE
          });
        } else {
          dispatch({
            type: RETRIEVE_COMMENTS_SUCCESS,
            payload: res.body.data,
          });
        }
      });
  };
};

export const CommentsReducers = (state = {comments: []}, action) => {
  switch (action.type) {
    case RETRIEVE_COMMENTS: {
      return {
        ...state
      };
    }
    case RETRIEVE_COMMENTS_SUCCESS: {
      return {
        ...state,
        comments: action.payload
      };
    }
    case RETRIEVE_COMMENTS_FAILURE: {
      return {
        ...state
      };
    }
    default: return state;
  }
};

export default CommentsReducers;
