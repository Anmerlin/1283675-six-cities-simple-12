export type OfferCard = {
  id: number;
  isPremium: boolean;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};


export type OfferCards = OfferCard[];
