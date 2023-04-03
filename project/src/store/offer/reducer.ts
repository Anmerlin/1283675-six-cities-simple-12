import { createReducer } from '@reduxjs/toolkit';
import { changeCity, selectSorting, loadOffers, selectOffer, setOffersDataLoadingStatus } from './action';
import { OfferCards } from 'types/offer';
import { CityName } from 'types/city';
import { SortingType } from 'types/sorting';
import { DEFAULT_CITY, DEFAULT_SORTING, DEFAULT_SELECT_CARD, sortingOptions } from 'const';

type InitialState = {
  initialOffers: OfferCards;
  filterOffers: OfferCards;
  selectedCity: CityName;
  selectedSorting: SortingType;
  selectedSortingValue: string;
  selectedOffer: number;
  isOffersDataLoading: boolean;
};

const initialState: InitialState = {
  initialOffers: [],
  filterOffers: [],
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING,
  selectedSortingValue: sortingOptions.A.text,
  selectedOffer: DEFAULT_SELECT_CARD,
  isOffersDataLoading: false,
};

export const offerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.initialOffers = action.payload;
      state.filterOffers = action.payload.filter(({ city }) => city.name === state.selectedCity);
    })
    .addCase(changeCity, (state, action) => {
      const { targetCity } = action.payload;
      state.selectedCity = targetCity;
      state.filterOffers = state.initialOffers.filter(({ city }) => city.name === state.selectedCity);
      state.selectedSorting = DEFAULT_SORTING;
    })
    .addCase(selectSorting, (state, action) => {
      const { targetSorting } = action.payload;
      state.selectedSorting = targetSorting;
      state.selectedSortingValue = sortingOptions[targetSorting].text;
      if (state.selectedSorting === DEFAULT_SORTING) {
        state.filterOffers = state.initialOffers.filter(({ city }) => city.name === state.selectedCity);
      } else {
        state.filterOffers = state.filterOffers.sort((a, b) => {
          switch (state.selectedSorting) {
            case 'B':
              return a.price - b.price;
            case 'C':
              return b.price - a.price;
            case 'D':
              return b.rating - a.rating;
            default:
              return 0;
          }
        });
      }
    })
    .addCase(selectOffer, (state, action) => {
      const { targetOffer } = action.payload;
      state.selectedOffer = targetOffer;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
