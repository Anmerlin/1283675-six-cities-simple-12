import { State } from 'types/state';

export const getDataLoading = (state: State) => state.offer.isDataLoading;
export const getSelectedCity = (state: State) => state.offer.city;
export const getInitialOffers = (state: State) => state.offer.initialOffers;
export const getFilterOffers = (state: State) => state.offer.filterOffers;
export const getSelectedSorting = (state: State) => state.offer.sortingText;
export const getSelectedOffer = (state: State) => state.offer.offer;
export const getTargetOffer = (state: State) => state.offer.targetOffer;
export const getNearbyOffers = (state: State) => state.offer.nearbyOffers;
export const getReviews = (state: State) => state.offer.reviews;
