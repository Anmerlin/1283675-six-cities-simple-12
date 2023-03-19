import { Person } from './person';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type City = {
  location: Location;
  name: string;
}

export type OfferCard = {
  id: number;
  isPremium: boolean;
  previewImage: string;
  images: string[];
  price: number;
  rating: number;
  title: string;
  type: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  description: string;
  city: City;
  location: Location;
  host: Person;
};

export type OfferCards = OfferCard[];
