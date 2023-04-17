import { createSlice } from '@reduxjs/toolkit';
import { fetchOffersAction, fetchTargetOfferAction, sendReviewAction } from './api-actions';
import { OffersData } from 'types/state';
import { NameSpace } from 'const';

export const initialState: OffersData = {
  offers: {
    data: [],
    isDataLoading: false,
  },
  offer: {
    targetOffer: null,
    nearbyOffers: [],
    reviews: [],
    isInitial: false,
    isDataLoading: false,
    isError: false,
  },
  review: {
    isSending: false,
    isSendingError: false,
  },
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offers.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers.data = action.payload;
        state.offers.isDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers.isDataLoading = false;
      })
      .addCase(fetchTargetOfferAction.pending, (state) => {
        if (!state.offer.isInitial) {
          state.offer.isInitial = true;
        }
        state.offer.isDataLoading = true;
      })
      .addCase(fetchTargetOfferAction.fulfilled, (state, action) => {
        const [targetOffer, nearbyOffers, comments] = action.payload;
        state.offer.targetOffer = targetOffer;
        state.offer.nearbyOffers = nearbyOffers;
        state.offer.reviews = comments.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          return -1;
        }).slice(0, 10);
        state.offer.isDataLoading = false;
      })
      .addCase(fetchTargetOfferAction.rejected, (state) => {
        state.offer.isError = true;
        state.offer.isDataLoading = false;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.review.isSending = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.offer.reviews = action.payload.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          return -1;
        }).slice(0, 10);
        state.review.isSending = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.review.isSendingError = true;
        state.review.isSending = false;
      });
  }
});
