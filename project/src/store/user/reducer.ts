import { createReducer } from '@reduxjs/toolkit';
import { setAuthorizationStatus, setUserData } from './action';
import { UserData } from 'types/user-data';
import { AuthorizationStatus } from 'const';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userData: UserData;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userData: {
    id: 1,
    avatarUrl: '',
    isPro: false,
    email: '',
    name: '',
    token: ''
  },
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
