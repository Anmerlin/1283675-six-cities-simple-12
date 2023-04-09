import { Person as Guest } from './person';
import { RatingScores } from 'const';

export type ReviewOfferCard = {
  id: number;
  user: Guest;
  rating: number;
  comment: string;
  date: string;
};

export type ReviewData = {
  review: string;
  rating: typeof RatingScores[number]['value'] | 0;
};

export type ReviewOfferCards = ReviewOfferCard[];
