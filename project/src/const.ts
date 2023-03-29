export enum AppRoute {
  Login = '/login',
  Main = '/',
  Offer = '/offer',
  OfferById = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const PagesOption = {
  Main: {
    title: 'Six cities simple',
    postfixCls: 'index'
  },
  Empty: {
    title: 'Six cities simple: no places',
    postfixCls: 'index-empty'
  },
  Login: {
    title: 'Six cities simple: authorizations',
    postfixCls: 'login'
  },
  Offer: {
    title: 'Six cities simple: offer',
    postfixCls: 'property'
  },
  NotFound: {
    title: 'Six cities simple: page not found',
    postfixCls: 'not-found'
  }
} as const;

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const DEFAULT_CITY: typeof Cities[number] = 'Paris';

export const SortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;

export const DEFAULT_SORTING: typeof SortingOptions[number] = 'Popular';

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
