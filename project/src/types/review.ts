import { Person as Guest} from './person';

export type ReviewOfferCard = {
  id: number;
  user: Guest;
  rating: number;
  comment: string;
  date: string;
};

export type ReviewOfferCards = ReviewOfferCard[];
