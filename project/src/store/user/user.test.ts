import { checkAuthAction, loginAction, logoutAction } from './api-actions';
import { initialState, user } from './user';
import { AuthorizationStatus } from 'const';
import { makeFakeUser } from 'utils/mocks';

const userData = makeFakeUser();

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(user.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set user data if checkAuthAction fulfilled', () => {
      expect(
        user.reducer(initialState, {
          type: checkAuthAction.fulfilled.type,
          payload: userData,
        })
      ).toEqual({ authorizationStatus: AuthorizationStatus.Auth, userData });
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(
        user.reducer(initialState, { type: checkAuthAction.rejected.type, userData: null })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and set user data if loginAction fulfilled', () => {
      expect(
        user.reducer(initialState, { type: loginAction.fulfilled.type, payload: userData })
      ).toEqual({ authorizationStatus: AuthorizationStatus.Auth, userData });
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(
        user.reducer(initialState, { type: loginAction.rejected.type })
      ).toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, userData: null });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(
        user.reducer(initialState, { type: logoutAction.fulfilled.type })
      ).toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, userData: null });
    });
  });
});
