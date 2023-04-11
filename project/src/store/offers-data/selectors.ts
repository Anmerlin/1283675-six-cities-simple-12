import { OffersData, State } from 'types/state';
import { NameSpace } from 'const';

export const getOffers = (state: State): OffersData['offers'] => state[NameSpace.Data].offers;
export const getTargetOffer = (state: State): OffersData['targetOffer'] => state[NameSpace.Data].targetOffer;
export const getNearbyOffers = (state: State): OffersData['nearbyOffers'] => state[NameSpace.Data].nearbyOffers;
export const getDataLoadingStatus = (state: State): OffersData['isDataLoading'] => state[NameSpace.Data].isDataLoading;
export const getErrorStatus = (state: State): OffersData['isError'] => state[NameSpace.Data].isError;
export const getReviews = (state: State): OffersData['reviews'] => state[NameSpace.Data].reviews;
export const getReviewSendStatus = (state: State): OffersData['isReviewSend'] => state[NameSpace.Data].isReviewSend;
export const getSendErrorStatus = (state: State): OffersData['isSendError'] => state[NameSpace.Data].isSendError;
