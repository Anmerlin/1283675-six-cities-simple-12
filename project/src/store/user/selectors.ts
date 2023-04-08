import { State } from 'types/state';

export const getUserData = (state: State) => state.user.userData;
export const getAuthorizationStatus = (state: State) => state.user.authorizationStatus;
