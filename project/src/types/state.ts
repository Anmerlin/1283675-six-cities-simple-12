import { store } from 'store/index';
import { AuthorizationStatus } from 'const';
import { CityName } from './city';
import { SortingData } from './sorting';
import { OfferItem, OfferList } from './offer';
import { ReviewList } from './review';
import { UserData } from './user-data';

export type OffersProcess = {
  city: CityName;
  sorting: SortingData;
}

export type OffersData = {
  offers: OfferList;
  offer: number;
  targetOffer: OfferItem | null;
  nearbyOffers: OfferList;
  isDataLoading: boolean;
  isError: boolean;
  reviews: ReviewList;
  isReviewSend: boolean;
  isSendError: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
