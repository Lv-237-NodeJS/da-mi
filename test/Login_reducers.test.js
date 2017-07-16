import loginReducer from './../app/src/components/Login/loginReducer';
import * as loginActions from './../app/src/components/Login/loginActions';
import * as router from 'react-router';

const resolve = reducerFunctions => (state, action) => {
  const reducer = reducerFunctions[action.type];
  return reducer ? reducer(state, action) : state;
};

const login = resolve(loginReducer);

describe('loginReducer execution', () => {
  const state = {};
  describe('LOGIN_USER_FAILURE', () => {
    it('should return the correct state', () => {
      const action = loginActions.loginUserFailure('message');
      
      expect(login(state, action))
        .toEqual({
          ...state,
          illegalInput: true,
          message: action.message
        });
    });
  });

  describe('CHECK_TOKEN', () => {
    it('should return the correct state', () => {
      const action = loginActions.checkToken();
      
      expect(login(state, action)).toEqual({
        ...state,
        isAuth: action.isAuth
      });
    });
  });

  describe('LOGOUT_USER', () => {
    it('should return the correct state', () => {
      router.browserHistory = { push: () => {} };
      
      expect(login(state, loginActions.logout())).toEqual({
        ...state,
        isAuth: false
      });
    });
  });

  describe('LOGIN_USER_SUCCESS', () => {
    it('should return the correct state', () => {
      router.browserHistory = { push: () => {} };
      const action = loginActions.loginUserSuccess('token', 777);
      
      expect(login(state, action)).toEqual({
        ...state,
        illegalInput: false,
        isAuth: true,
        userId: action.userId
      });
    });
  });
});
