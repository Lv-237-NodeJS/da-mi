const loginReducer = {
  LOGIN_USER_FAILURE: (state, action) => ({
    ...state,
    illegalInput: true,
    message: action.message
  }),
  LOGIN_USER_SUCCESS: (state, action) => ({
    ...state,
    illegalInput: false,
    isAuth: true,
    userId: action.userId
  }),
  LOGOUT_USER: (state, action) => ({
    ...state,
    isAuth: false
  }),
  CHECK_TOKEN: (state, action) => ({
    ...state,
    isAuth: action.isAuth
  })
};

export default loginReducer;
