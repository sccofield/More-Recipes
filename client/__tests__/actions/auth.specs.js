import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

import { login,
  signUpRequest,
  logout,
  updateProfile,
  forgotPassword,
  confirmForgotPassword
} from '../../main//src/actions/auth/Auth';
import { response,
  changePasswordResponse,
  forgotPasswordResponse
} from '../__mocks__/actions/user';

const mockStore = configureMockStore([thunk]);

describe('Auth', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());


  describe('SignUp', () => {
    it('should SET_CURRENT_USER when a user is succussfully signup', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response
        });
      });

      const expectedAction = [
        {
          type: 'SET_CURRENT_USER',
          user: response.data.token
        }
      ];
      const store = mockStore({ });
      return store.dispatch(signUpRequest({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('SignIn', () => {
    it('should SET_CURRENT_USER when a user is succussfully signin', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response
        });
      });

      const expectedAction = [
        {
          type: 'SET_CURRENT_USER',
          user: response.data.token
        }
      ];
      const store = mockStore({ });
      return store.dispatch(login({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('SignOut', () => {
    it('should SET_CURRENT_USER when a user is succussfully signout', () => {
      const expectedAction = [
        {
          type: 'SET_CURRENT_USER',
          user: {}
        }
      ];
      const store = mockStore({ });
      store.dispatch(logout({}));
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  describe('UpdateProfile', () => {
    it('should UPDATE_PROFILE when a user is succussfully update his/her profile', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response
        });
      });

      const expectedAction = [
        {
          type: 'UPDATE_PROFILE',
          user: response.data.token
        }
      ];
      const store = mockStore({ });
      return store.dispatch(updateProfile({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });
  describe('confirmForgotPassword', () => {
    it('should return status code 200 when a user is succussfully resets his/her password', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: changePasswordResponse
        });
      });

      const store = mockStore({ });
      return store.dispatch(confirmForgotPassword({}))
        .then((res) => {
          expect(res).toEqual(changePasswordResponse);
        });
    });
  });

  describe('confirmForgotPassword', () => {
    it('should return status code 200 when a user request to resets his/her password', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: forgotPasswordResponse
        });
      });

      const store = mockStore({ });
      return store.dispatch(forgotPassword({}))
        .then((res) => {
          expect(res).toEqual(forgotPasswordResponse);
        });
    });
  });
});
