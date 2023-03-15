export type ReviewUser = {
  id: number;
  isPro: boolean;
  avatarUrl: string;
  name: string;
}

export type ReviewOfferCard = {
  id: number;
  user: ReviewUser;
  rating: number;
  comment: string;
  date: string;
};
