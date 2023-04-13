import { NameSpace } from 'const';
import { State, User } from 'types/state';

export const getAuthorizationStatus = (state: State): User['authorizationStatus'] => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State): User['userData'] => state[NameSpace.User].userData;
