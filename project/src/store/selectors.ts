import { State } from 'types/state';

export const getSelectedCity = (state: State) => state.offer.selectedCity;
export const getInitialOffers = (state: State) => state.offer.initialOffers;
export const getFilterOffers = (state: State) => state.offer.filterOffers;
export const getSelectedSorting = (state: State) => state.offer.selectedSortingValue;
export const getSelectedOffer = (state: State) => state.offer.selectedOffer;
export const getOffersDataLoading = (state: State) => state.offer.isOffersDataLoading;

export const getUserData = (state: State) => state.user.userData;
export const getAuthorizationStatus = (state: State) => state.user.authorizationStatus;
