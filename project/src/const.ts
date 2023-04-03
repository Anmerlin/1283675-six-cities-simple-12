import { CityName } from 'types/city';
import { SortingOption, SortingType } from 'types/sorting';

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

export const plural = new Intl.PluralRules('en-US');

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

export const cityNames = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const DEFAULT_CITY: CityName = 'Paris';

export const sortingOptions: SortingOption = {
  A: {
    text: 'Popular',
    value: 'A',
  },
  B: {
    text: 'Price: low to high',
    value: 'B',
  },
  C: {
    text: 'Price: high to low',
    value: 'C',
  },
  D: {
    text: 'Top rated first',
    value: 'D',
  },
};

export const DEFAULT_SORTING: SortingType = 'A';

export const DEFAULT_SELECT_CARD = -1;

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

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
}
