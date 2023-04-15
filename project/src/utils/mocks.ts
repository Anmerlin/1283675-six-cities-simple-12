import { datatype, image, internet, name } from 'faker';
import { cityNames, housingType } from 'const';
import { UserData } from 'types/user-data';
import { City } from 'types/city';
import { OfferItem } from 'types/offer';
import { ReviewData, ReviewItem, ReviewList } from 'types/review';

export const makeFakeUser = (): UserData => ({
  avatarUrl: image.avatar(),
  email: internet.email(),
  id: datatype.number(100),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(),
});

export const makeFakeCity = (): City => ({
  location: {
    latitude: datatype.float(0.01),
    longitude: datatype.float(0.01),
    zoom: datatype.number(10),
  },
  name: cityNames[Math.floor(Math.random() * cityNames.length)],
});

export const makeFakeOffer = (): OfferItem => ({
  id: datatype.number(100),
  isPremium: datatype.boolean(),
  previewImage: image.abstract(),
  images: Array.from({ length: datatype.number(10) }, () => image.abstract()),
  price: datatype.number(100),
  rating: datatype.number(100),
  title: datatype.string(),
  type: Object.keys(housingType)[Math.floor(Math.random() * Object.keys(housingType).length)],
  bedrooms: datatype.number(100),
  maxAdults: datatype.number(100),
  goods: Array.from({ length: datatype.number(10) }, () => datatype.string()),
  description: datatype.string(),
  city: {
    location: {
      latitude: datatype.float(0.01),
      longitude: datatype.float(0.01),
      zoom: datatype.number(10),
    },
    name: cityNames[Math.floor(Math.random() * cityNames.length)],
  },
  location: {
    latitude: datatype.float(0.01),
    longitude: datatype.float(0.01),
    zoom: datatype.number(10),
  },
  host: {
    id: datatype.number(100),
    avatarUrl: image.avatar(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
});

export const makeFakeOffers = (offersLength = 10) =>
  Array.from({ length: offersLength }, (element, index) => ({
    ...makeFakeOffer(),
    id: index,
  }));

export const makeFakeReview = (): ReviewItem => ({
  id: datatype.number(),
  user: makeFakeUser(),
  rating: datatype.number(5),
  comment: datatype.string(),
  date: datatype.string(),
});

export const makeFakeReviews = (): ReviewList =>
  Array.from({ length: 10 }, (element, index) => ({ ...makeFakeReview(), id: index }));

export const makeFakeReviewData = (): ReviewData => ({
  review: datatype.string(),
  rating: 5,
});
