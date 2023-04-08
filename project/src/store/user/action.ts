import { createAction } from '@reduxjs/toolkit';
import { UserData } from 'types/user-data';
import { AppRoute, AuthorizationStatus } from 'const';

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
export const redirectToRoute = createAction<AppRoute>('offer/redirectToRoute');
export const setUserData = createAction<UserData>('user/userData');
