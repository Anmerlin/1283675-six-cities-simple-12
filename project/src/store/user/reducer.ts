import { createReducer } from '@reduxjs/toolkit';
import { setUserData, setLogout } from './action';
import { UserData } from 'types/user-data';
import { AuthorizationStatus } from 'const';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(setLogout, (state, action) => {
      //  если не передаю action то устанавливается только state, при этом визуально logout не происходит, видно только после обновления
      state.authorizationStatus = action.payload;
      // state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});
