import { createReducer } from '@reduxjs/toolkit';
import { changeCity, selectSorting, loadOffers, selectOffer, setOffersDataLoadingStatus, requireAuthorization } from './action';
import { OfferCards } from '../types/offer';
import { CityName } from '../types/city';
import { SortingOption } from '../types/sorting';
import { DEFAULT_CITY, DEFAULT_SORTING, DEFAULT_SELECT_CARD, AuthorizationStatus } from 'const';

type InitialState = {
  offers: OfferCards;
  selectedCity: CityName;
  selectedSorting: SortingOption;
  selectedOffer: number;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  offers: [],
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING,
  selectedOffer: DEFAULT_SELECT_CARD,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { targetCity } = action.payload;
      state.selectedCity = targetCity;
      state.offers = state.offers.filter(({ city }) => city.name === state.selectedCity);
      state.selectedSorting = DEFAULT_SORTING;
    })
    .addCase(selectSorting, (state, action) => {
      const { targetSorting } = action.payload;
      state.selectedSorting = targetSorting;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(selectOffer, (state, action) => {
      const { targetOffer } = action.payload;
      state.selectedOffer = targetOffer;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
