import { createAction } from '@reduxjs/toolkit';
import { CityName } from 'types/city';
import { OfferCard, OfferCards } from 'types/offer';
import { SortingType } from 'types/sorting';
import { ReviewOfferCards } from 'types/review';

export const changeCity = createAction<{ targetCity: CityName }>('offer/changeCity');
export const selectSorting = createAction<{ targetSorting: SortingType }>('offer/selectSorting');
export const loadOffers = createAction<OfferCards>('data/loadOffers');
export const selectOffer = createAction<{ targetOffer: number }>('offer/selectOffer');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
export const loadTargetOffer = createAction<OfferCard>('data/loadTargetOffer');
export const loadNearbyOffers = createAction<OfferCards>('data/loadNearbyOffers');

export const loadReviews = createAction<ReviewOfferCards>('data/loadReviews');
