export enum AppRoute {
  Login = '/login',
  Main = '/',
  Room = '/offer/:id',
}

export enum MainClassByPage {
  Main = 'index',
  Login = 'login',
  Offer = 'property',
  Empty = 'index-empty'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_RATING = 5;

export const RatingScores = [
  {
    id: 5,
    value: 5,
    title: 'perfect'
  },
  {
    id: 4,
    value: 4,
    title: 'good'
  },
  {
    id: 3,
    value: 3,
    title: 'not bad'
  },
  {
    id: 2,
    value: 2,
    title: 'badly'
  },
  {
    id: 1,
    value: 1,
    title: 'terribly'
  },
];

export const MIN_LENGTH_INPUT = 50;
