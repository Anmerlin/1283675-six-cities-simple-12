import { createAction } from '@reduxjs/toolkit';
import { CityName } from 'types/city';
import { OfferCards } from 'types/offer';
import { SortingType } from 'types/sorting';

export const changeCity = createAction<{ targetCity: CityName }>('offer/changeCity');
export const selectSorting = createAction<{ targetSorting: SortingType }>('offer/selectSorting');
export const loadOffers = createAction<OfferCards>('data/loadOffers');
export const selectOffer = createAction<{ targetOffer: number }>('offer/selectOffer');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
