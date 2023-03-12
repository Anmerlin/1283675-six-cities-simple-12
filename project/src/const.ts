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
