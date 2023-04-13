import { store } from 'store/index';
import { AuthorizationStatus } from 'const';
import { CityName } from './city';
import { SortingData } from './sorting';
import { OfferItem, OfferList } from './offer';
import { ReviewList } from './review';
import { UserData } from './user-data';

export type OffersData = {
  offers: {
    data: OfferList;
    isDataLoading: boolean;
  };
  offer: {
    targetOffer: OfferItem | null;
    nearbyOffers: OfferList;
    reviews: ReviewList;
    isInitial: boolean;
    isDataLoading: boolean;
    isError: boolean;
  };
  review: {
    isSending: boolean;
    isSendingError: boolean;
  };
};

export type OffersList = {
  city: CityName;
  sorting: SortingData;
};

export type User = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
