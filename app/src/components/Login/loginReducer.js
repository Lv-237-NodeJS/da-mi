const loginReducer = {
  LOGIN_USER_FAILURE: (state, action) => {
    return {
      ...state,
      illegalInput: true,
      message: action.message
    };
  },
  LOGIN_USER_SUCCESS: (state, action) => {
    return {
      ...state,
      illegalInput: false,
      isAuth: true,
      userId: action.userId
    };
  },
  LOGOUT_USER: (state, action) => {
    return {
      ...state,
      isAuth: false
    };
  },
  CHECK_TOKEN: (state, action) => {
    return {
      ...state,
      isAuth: action.isAuth
    };
  }
};

export default loginReducer;
