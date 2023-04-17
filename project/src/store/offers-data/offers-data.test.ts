import { initialState, offersData } from './offers-data';
import { OfferItem, OfferList } from 'types/offer';
import { ReviewList } from 'types/review';
import { makeFakeOffer, makeFakeOffers, makeFakeReviews } from 'utils/mocks';
import { fetchOffersAction, fetchTargetOfferAction, sendReviewAction } from './api-actions';

const offer = makeFakeOffer();
const offers = makeFakeOffers(3);

const targetOffer = offer;
const nearbyOffers = offers;
const reviews = makeFakeReviews();
const targetOfferPayload: [OfferItem, OfferList, ReviewList] = [
  targetOffer,
  nearbyOffers,
  reviews,
];

describe('Reducer: offersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  it('should set isDataLoading to "true" before receiving offers', () => {
    expect(
      offersData.reducer(initialState, { type: fetchOffersAction.pending.type }).offers
    ).toEqual({ ...initialState.offers, isDataLoading: true });
  });

  it('should set loaded offers and isDataLoading to "false"', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffersAction.fulfilled.type,
        payload: offers,
      }).offers
    ).toEqual({ data: offers, isDataLoading: false });
  });

  it('should set isDataLoading to "false" on offers rejected', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffersAction.rejected.type,
      }).offers
    ).toEqual({ ...initialState.offers, isDataLoading: false });
  });

  it('should set isInitial to "true" and isDataLoading to "true" when pending before receiving targetOffer', () => {
    expect(
      offersData.reducer(initialState, { type: fetchTargetOfferAction.pending.type }).offer
    ).toEqual({ ...initialState.offer, isInitial: true, isDataLoading: true });
  });

  it('should set targetOffer, nearbyOffers, reviews and isDataLoading to "false"', () => {
    expect(offersData.reducer(initialState, {
      type: fetchTargetOfferAction.fulfilled.type,
      payload: targetOfferPayload,
    }).offer
    ).toEqual({
      ...initialState.offer,
      targetOffer,
      nearbyOffers,
      reviews,
      isDataLoading: false,
    });
  });

  it('should set isError to "true" and isDataLoading to "false" on targetOffer rejected', () => {
    expect(
      offersData.reducer(initialState, { type: fetchTargetOfferAction.rejected.type }).offer
    ).toEqual({ ...initialState.offer, isError: true, isDataLoading: false });
  });

  it('should set isSending to "true" pending review', () => {
    expect(
      offersData.reducer(initialState, { type: sendReviewAction.pending.type }).review
    ).toEqual({ ...initialState.review, isSending: true });
  });

  it('should update reviews and set isSending "false"', () => {
    const actionChecking = offersData.reducer(initialState, {
      type: sendReviewAction.fulfilled.type,
      payload: reviews,
    });
    expect({
      offer: actionChecking.offer,
      review: actionChecking.review,
    }).toEqual({
      offer: { ...initialState.offer, reviews },
      review: { ...initialState.review, isSending: false }
    });
  });

  it('should set isSendingError to "true" and isSending to "false" on review rejected', () => {
    expect(
      offersData.reducer(initialState, { type: sendReviewAction.rejected.type }).review
    ).toEqual({ isSendingError: true, isSending: false });
  });
});
