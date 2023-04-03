import { createAction } from '@reduxjs/toolkit';
import { CityName } from 'types/city';
import { SortingOption } from 'types/sorting';
import { OfferCards } from 'types/offer';
import { AuthorizationStatus } from 'const';

export const changeCity = createAction<{ targetCity: CityName }>('offer/changeCity');
export const selectSorting = createAction<{ targetSorting: SortingOption }>('offer/selectSorting');
export const loadOffers = createAction<OfferCards>('data/loadOffers');
export const selectOffer = createAction<{ targetOffer: number }>('offer/selectOffer');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
