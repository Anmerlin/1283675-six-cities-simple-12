import { createAction } from '@reduxjs/toolkit';
import { Cities, SortingOptions } from 'const';

export const changeCity = createAction<{targetCity: typeof Cities[number]}>('offer/changeCity');
export const updateOffers = createAction('offer/updateOffers');
export const sortOffers = createAction('offer/sortOffers');
export const selectSorting = createAction<{targetSorting: typeof SortingOptions[number]}>('offer/selectSorting');
