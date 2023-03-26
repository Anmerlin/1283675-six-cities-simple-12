export enum AppRoute {
  Login = '/login',
  Main = '/',
  Offer = '/offer',
  OfferById = '/offer/:id',
  NotFound = '*',
}

export enum MainClassModifierByPage {
  Main = 'index',
  Login = 'login',
  Offer = 'property',
  Empty = 'index-empty',
  NotFound = 'not-found'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const PagesTitle = {
  Main: 'Six cities simple',
  Login: 'Six cities simple: authorizations',
  Empty: 'Six cities simple: no places',
  Offer: 'Six cities simple: offer',
  NotFound: 'Six cities simple: page not found'
} as const;

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const DEFAULT_CITY = 'Amsterdam';

export const housingType = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

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

export const MarkerIcon = {
  Image: {
    Default: '/img/pin.svg',
    Active: '/img/pin-active.svg',
  },
  Size: {
    Width: 28,
    Height: 40,
  },
} as const;
