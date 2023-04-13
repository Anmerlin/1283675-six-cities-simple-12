import { OffersData, State } from 'types/state';
import { NameSpace } from 'const';

export const getOffers = (state: State): OffersData['offers']['data'] => state[NameSpace.Data].offers.data;
export const getDataOffersLoadingStatus = (state: State): OffersData['offers']['isDataLoading'] => state[NameSpace.Data].offers.isDataLoading;

export const getTargetOffer = (state: State): OffersData['offer']['targetOffer'] => state[NameSpace.Data].offer.targetOffer;
export const getNearbyOffers = (state: State): OffersData['offer']['nearbyOffers'] => state[NameSpace.Data].offer.nearbyOffers;
export const getReviews = (state: State): OffersData['offer']['reviews'] => state[NameSpace.Data].offer.reviews;
export const getInitialStatus = (state: State): OffersData['offer']['isInitial'] => state[NameSpace.Data].offer.isInitial;
export const getDataOfferLoadingStatus = (state: State): OffersData['offer']['isDataLoading'] => state[NameSpace.Data].offer.isDataLoading;
export const getErrorStatus = (state: State): OffersData['offer']['isError'] => state[NameSpace.Data].offer.isError;

export const getSendingStatus = (state: State): OffersData['review']['isSending'] => state[NameSpace.Data].review.isSending;
export const getSendingErrorStatus = (state: State): OffersData['review']['isSendingError'] => state[NameSpace.Data].review.isSendingError;
