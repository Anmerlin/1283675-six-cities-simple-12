import { createReducer } from '@reduxjs/toolkit';
import { changeCity, selectSorting, updateOffers, selectOffer } from './action';
import { DEFAULT_CITY, DEFAULT_SORTING, DEFAULT_SELECT_CARD } from 'const';
import { offers } from 'mocks/offers';

const initialState = {
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING,
  selectedOffer: DEFAULT_SELECT_CARD,
  offers: offers.filter(({ city }) => city.name === DEFAULT_CITY)
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { targetCity } = action.payload;
      state.selectedCity = targetCity;
      state.selectedSorting = DEFAULT_SORTING;
    })
    .addCase(selectSorting, (state, action) => {
      const { targetSorting } = action.payload;
      state.selectedSorting = targetSorting;

      state.offers = state.offers.sort((a, b) => {
        switch (state.selectedSorting) {
          case 'Price: high to low':
            return b.price - a.price;
          case 'Price: low to high':
            return a.price - b.price;
          case 'Top rated first':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    })
    .addCase(updateOffers, (state) => {
      state.offers = offers.filter(({ city }) => city.name === state.selectedCity);
    })
    .addCase(selectOffer, (state, action) => {
      const { targetOffer } = action.payload;
      state.selectedOffer = targetOffer;
    });
});
