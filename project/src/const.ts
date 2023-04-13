import { CityName } from 'types/city';
import { SortingData, SortingOption } from 'types/sorting';

export enum AppRoute {
  Main = '/',
  Login = '/login',
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
  popular: {
    text: 'Popular',
    value: 'popular',
  },
  priceToHigh: {
    text: 'Price: low to high',
    value: 'priceToHigh',
  },
  priceToLow: {
    text: 'Price: high to low',
    value: 'priceToLow',
  },
  rated: {
    text: 'Top rated first',
    value: 'rated',
  },
};

export const DEFAULT_SORTING: SortingData = sortingOptions['popular'];

export const housingType = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export const RatingScores = [
  {
    value: 5,
    title: 'perfect'
  },
  {
    value: 4,
    title: 'good'
  },
  {
    value: 3,
    title: 'not bad'
  },
  {
    value: 2,
    title: 'badly'
  },
  {
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
  Comments = '/comments',
}

export enum NameSpace {
  Data = 'DATA',
  Offer = 'OFFER',
  User = 'USER'
}
