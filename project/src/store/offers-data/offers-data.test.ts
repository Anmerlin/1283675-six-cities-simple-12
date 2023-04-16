import { OffersData } from 'types/state';
import { offersData } from './offers-data';
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
  let initialState: OffersData;

  beforeEach(() => {
    initialState = {
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
  });

  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });


  it('should set isDataLoading to "true" pending before receiving offers', () => {
    expect(
      offersData.reducer(initialState, { type: fetchOffersAction.pending.type })
    ).toEqual({ ...initialState, offers: { data: [], isDataLoading: true } }); // спросить
  });

  it('should set loaded offers and isDataLoading to "false"', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffersAction.fulfilled.type,
        payload: offers,
      })
    ).toEqual({ ...initialState, offers: { data: offers, isDataLoading: false } }); //спросить
  });

  it('should set isDataLoading to "false" on offers rejected', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffersAction.rejected.type,
      })
    ).toEqual({ ...initialState, offers: { data: [], isDataLoading: false } }); // спросить
  });

  it('should set isInitial to "true" and isDataLoading to "true" when pending before receiving targetOffer', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchTargetOfferAction.pending.type,
      })
    ).toEqual({ ...initialState, offer: { ...initialState.offer, isInitial: true, isDataLoading: true } });
  });

  it('should set targetOffer, nearbyOffers, reviews and isDataLoading to "false"', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchTargetOfferAction.fulfilled.type,
        payload: targetOfferPayload,
      })
    ).toEqual({
      ...initialState,
      offer: {
        ...initialState.offer,
        targetOffer,
        nearbyOffers,
        reviews,
        isDataLoading: false,
      }
    });
  });

  it('should set isError to "true" and isDataLoading to "false" on targetOffer rejected', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchTargetOfferAction.rejected.type,
      })
    ).toEqual({ ...initialState, offer: { ...initialState.offer, isError: true, isDataLoading: false } });
  });

  it('should set isSending to "true" pending review', () => {
    expect(
      offersData.reducer(initialState, { type: sendReviewAction.pending.type })
    ).toEqual({ ...initialState, review: { ...initialState.review, isSending: true } });
  });

  it('should update reviews and set isSending "false"', () => {
    expect(
      offersData.reducer(initialState, {
        type: sendReviewAction.fulfilled.type,
        payload: reviews,
      })
    ).toEqual({
      ...initialState,
      offer: { ...initialState.offer, reviews },
      review: { ...initialState.review, isSending: false }
    });
  });

  it('should set isSendingError to "true" and isSending to "false" on review rejected', () => {
    expect(
      offersData.reducer(initialState, {
        type: sendReviewAction.rejected.type,
      })
    ).toEqual({ ...initialState, review: { isSendingError: true, isSending: false } });
  });
});
