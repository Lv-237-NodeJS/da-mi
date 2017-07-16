const giftReducer = {
  FETCH_GIFTS_SUCCESS: (state, action) => ({
    ...state,
    gifts: action.payload,
    error: null
  }),
  FETCH_GIFTS_FAIL: (state, action) => ({
    ...state,
    error: action.payload
  }),
  CREATE_GIFT_SUCCESS: (state, action) => ({
    ...state,
    gifts: [action.payload, ...state.gifts],
    error: null
  }),
  CREATE_GIFT_FAIL: (state, action) => ({
    ...state,
    error: action.payload
  }),
  UPDATE_GIFT_SUCCESS: (state, action) => ({
    ...state,
    gifts: [action.payload, ...state.gifts.filter(gift => gift.id !== action.payload.id)],
    error: null
  }),
  UPDATE_GIFT_FAIL: (state, action) => ({
    ...state,
    error: action.payload
  }),
  DELETE_GIFT_SUCCESS: (state, action) => ({
    ...state,
    gifts: state.gifts.filter(gift => gift.id !== action.payload),
    error: null
  }),
  DELETE_GIFT_FAIL: (state, action) => ({
    ...state,
    error: action.payload
  })
};

export default giftReducer;
