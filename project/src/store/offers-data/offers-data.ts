import { createSlice } from '@reduxjs/toolkit';
import { fetchOffersAction, fetchTargetOfferAction, sendReviewAction } from './api-actions';
import { OffersData } from 'types/state';
import { NameSpace, DEFAULT_SELECT_CARD } from 'const';

const initialState: OffersData = {
  offers: [],
  offer: DEFAULT_SELECT_CARD,
  targetOffer: null,
  nearbyOffers: [],
  isDataLoading: false,
  isError: true,
  reviews: [],
  isReviewSend: false,
  isSendError: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchTargetOfferAction.pending, (state) => {
        state.isError = false;
        state.isDataLoading = true;
      })
      .addCase(fetchTargetOfferAction.fulfilled, (state, action) => {
        const [targetOffer, nearbyOffers, comments] = action.payload;
        state.targetOffer = targetOffer;
        state.nearbyOffers = nearbyOffers;
        state.reviews = [...comments].sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          return -1;
        }).slice(0, 10);
        state.isDataLoading = false;
      })
      .addCase(fetchTargetOfferAction.rejected, (state) => {
        state.isError = true;
        state.isDataLoading = false;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.isSendError = false;
        state.isReviewSend = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews = [...action.payload].sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          return -1;
        }).slice(0, 10);
        state.isReviewSend = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.isSendError = true;
        state.isReviewSend = false;
      });
  }
});
