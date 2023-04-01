import { State } from 'types/state';

export const getSelectedCity = (state: State) => state.selectedCity;
// спросить
// export const getOffersByCity = (state: State) => state.offers.filter(({ city }) => city.name === selectedCity);
export const getOffers = (state: State) => state.offers;
export const getSelectedSorting = (state: State) => state.selectedSorting;
export const getSelectedOffer = (state: State) => state.selectedOffer;
export const getOffersDataLoading = (state: State) => state.isOffersDataLoading;
