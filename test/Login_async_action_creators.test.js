import * as loginActions from './../app/src/components/Login/loginActions';
import { API } from './../app/src/helper/constants';
import * as router from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  
  it('creates LOGIN_USER_SUCCESS when user has been logged in', () => {
    router.browserHistory = { push: () => {} };
    const expectedActions = [
      loginActions.loginUserRequest(),
      loginActions.loginUserSuccess('do something', 777)
    ];
    const store = mockStore({ loggedUser: [] });
    nock(API.URL)
      .post('/api/auth/login', {
        email: 'ivan.yarymovych@gmail.com',
        password: 'P!assword!1',
      })
      .reply(201, (uri, res) => {
        const response = Object.assign(JSON.parse(res), {token: 'do something', user_id: 777});
        const token = response.token;
        const userId = response.user_id;
        return store.dispatch(loginActions.loginUserSuccess(token, userId));
      });
    store.dispatch(loginActions.loginUser('ivan.yarymovych@gmail.com', 'P!assword!1'));
    
    expect(store.getActions()).toEqual(expectedActions);
  });
});
