import { createReducer } from '@reduxjs/toolkit';
import { changeCity, selectSorting, sortOffers, updateOffers } from './action';
import { DEFAULT_CITY, DEFAULT_SORTING } from 'const';
import { offers } from 'mocks/offers';

const initialState = {
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING,
  offers: offers.filter(({ city }) => city.name === DEFAULT_CITY)
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { targetCity } = action.payload;
      state.selectedCity = targetCity;
    })
    .addCase(selectSorting, (state, action) => {
      const { targetSorting } = action.payload;
      state.selectedSorting = targetSorting;
    })
    .addCase(sortOffers, (state) => {
      if (state.selectedSorting === DEFAULT_SORTING) {
        state.offers = offers.filter(({ city }) => city.name === state.selectedCity);
      } else {
        // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
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
      }
    })
    .addCase(updateOffers, (state) => {
      state.offers = offers.filter(({ city }) => city.name === state.selectedCity);
    });
});
