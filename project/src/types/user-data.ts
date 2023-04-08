import { Person } from './person';

type AuthData = {
  email: string;
  token: string;
};

export type UserData = Person & AuthData;
