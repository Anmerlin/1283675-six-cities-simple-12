import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  selectSorting,
  loadOffers,
  selectOffer,
  setDataLoadingStatus,
  loadTargetOffer,
  loadNearbyOffers,
  loadReviews
} from './action';
import { OfferCard, OfferCards } from 'types/offer';
import { CityName } from 'types/city';
import { SortingType } from 'types/sorting';
import { ReviewOfferCards } from 'types/review';
import { DEFAULT_CITY, DEFAULT_SORTING, DEFAULT_SELECT_CARD, sortingOptions } from 'const';

type InitialState = {
  initialOffers: OfferCards;
  filterOffers: OfferCards;
  city: CityName;
  sorting: SortingType;
  sortingText: string;
  offer: number;
  isDataLoading: boolean;
  targetOffer: OfferCard | null;
  nearbyOffers: OfferCards;
  reviews: ReviewOfferCards;
};

const initialState: InitialState = {
  initialOffers: [],
  filterOffers: [],
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING,
  sortingText: sortingOptions[DEFAULT_SORTING].text,
  offer: DEFAULT_SELECT_CARD,
  isDataLoading: false,
  targetOffer: null,
  nearbyOffers: [],
  reviews: [],
};

export const offerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.initialOffers = action.payload;
      state.filterOffers = action.payload.filter(({ city }) => city.name === state.city);
    })
    .addCase(changeCity, (state, action) => {
      const { targetCity } = action.payload;
      state.city = targetCity;
      state.filterOffers = state.initialOffers.filter(({ city }) => city.name === state.city);
      state.sorting = DEFAULT_SORTING;
    })
    .addCase(selectSorting, (state, action) => {
      const { targetSorting } = action.payload;
      state.sorting = targetSorting;
      state.sortingText = sortingOptions[targetSorting].text;
      if (state.sorting === DEFAULT_SORTING) {
        state.filterOffers = state.initialOffers.filter(({ city }) => city.name === state.city);
      } else {
        state.filterOffers = state.filterOffers.sort((a, b) => {
          switch (state.sorting) {
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
      state.offer = targetOffer;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(loadTargetOffer, (state, action) => {
      state.targetOffer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = [...action.payload].sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        return -1;
      }).slice(0, 10);
    });
});
