import  { API, request }  from 'src/helper';

const RETRIEVE_COMMENTS = 'RETRIEVE_COMMENTS';
const RETRIEVE_COMMENTS_SUCCESS = 'RETRIEVE_COMMENTS_SUCCESS';
const RETRIEVE_COMMENTS_FAILURE = 'RETRIEVE_COMMENTS_FAILURE';

export const retrieveComments = (eventId, giftId) => dispatch =>
  request()
    .get(`${API.URL}/api/event/${eventId}/gift/${giftId}/comments`)
    .end((err, res) => err &&
        dispatch({
          type: RETRIEVE_COMMENTS_FAILURE,
        }) ||
        dispatch({
          type: RETRIEVE_COMMENTS_SUCCESS,
          payload: res.body.data,
        }));

export const CommentsReducers = (state = { comments: [] }, action) => {
  switch (action.type) {
    case RETRIEVE_COMMENTS: {
      return {
        ...state,
      };
    }

    case RETRIEVE_COMMENTS_SUCCESS: {
      return {
        ...state,
        comments: action.payload,
      };
    }

    case RETRIEVE_COMMENTS_FAILURE: {
      return {
        ...state,
      };
    }

    default: return state;
  }
};

export default CommentsReducers;
