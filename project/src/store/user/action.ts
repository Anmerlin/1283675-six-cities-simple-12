import { createAction } from '@reduxjs/toolkit';
import { UserData } from 'types/user-data';
import { AppRoute, AuthorizationStatus } from 'const';

export const REDIRECT_ACTION = 'offer/redirectToRoute';

// export const setLogout = createAction('user/setLogout');
export const setLogout = createAction<AuthorizationStatus>('user/setLogout');
export const setUserData = createAction<UserData>('user/userData');
export const redirectToRoute = createAction<AppRoute>(REDIRECT_ACTION);
