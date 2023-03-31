import { createAction } from '@reduxjs/toolkit';
import { CityName } from 'types/city';
import { SortingOption } from 'types/sorting';

export const changeCity = createAction<{ targetCity: CityName }>('offer/changeCity');
export const updateOffers = createAction('offer/updateOffers');
export const selectSorting = createAction<{ targetSorting: SortingOption }>('offer/selectSorting');
export const selectOffer = createAction<{ targetOffer: number }>('offer/selectOffer');
