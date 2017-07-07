import loginReduser from './../app/src/redux/login';
import * as loginActions from './../app/src/redux/login';
import * as router from 'react-router';

describe('loginReduser execution', () => {
  const state = {};
  
  describe('LOGIN_USER_FAILURE', () => {

    it('should return the correct state', () => {
      const action = loginActions.loginUserFailure('message');
      
      expect(loginReduser(state, action))
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
      
      expect(loginReduser(state, action)).toEqual({
        ...state,
        isAuth: action.isAuth
      });
    });
  });

  describe('LOGOUT_USER', () => {

    it('should return the correct state', () => {
      router.browserHistory = { push: () => {} };
      
      expect(loginReduser(state, loginActions.logout())).toEqual({
        ...state,
        isAuth: false
      });
    });
  });

  describe('LOGIN_USER_SUCCESS', () => {

    it('should return the correct state', () => {
      router.browserHistory = { push: () => {} };
      const action = loginActions.loginUserSuccess('token', 777);
      
      expect(loginReduser(state, action)).toEqual({
        ...state,
        illegalInput: false,
        isAuth: true,
        userId: action.userId
      });
    });
  });

  describe('default', () => {
    
    it('should return the correct state', () => {
      
      expect(loginReduser(state, {})).toEqual(state);
    });
  });
});
