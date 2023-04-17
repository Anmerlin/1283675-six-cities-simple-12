import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { datatype } from 'faker';
import { createAPI } from 'services/api';
import { APIRoute } from 'const';
import { State } from 'types/state';
import { fetchOffersAction, fetchTargetOfferAction, sendReviewAction } from './api-actions';
import { makeFakeOffer, makeFakeOffers, makeFakeReviewData, makeFakeReviews } from 'utils/mocks';
import { OfferList } from 'types/offer';
import { ReviewList } from 'types/review';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should fetchOffersAction when server returns 200', async () => {
    const offers = makeFakeOffers();

    const store = mockStore();
    mockAPI.onGet(APIRoute.Offers).reply(200, offers);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should fetchOffersAction when server returns 400', async () => {
    const offers: OfferList = [];

    const store = mockStore();
    mockAPI.onGet(APIRoute.Offers).reply(400, offers);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.rejected.type,
    ]);
  });

  it('should fetchTargetOfferAction when server returns 200', async () => {
    const hotelId = datatype.number(100);
    const targetOffer = makeFakeOffer();
    const reviews = makeFakeReviews();
    const nearbyOffers = Array.from({ length: datatype.number(10) }, () =>
      makeFakeOffer()
    );

    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${hotelId}`).reply(200, targetOffer);
    mockAPI.onGet(`${APIRoute.Offers}/${hotelId}/nearby`).reply(200, nearbyOffers);
    mockAPI.onGet(`${APIRoute.Comments}/${hotelId}`).reply(200, reviews);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchTargetOfferAction(hotelId));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchTargetOfferAction.pending.type,
      fetchTargetOfferAction.fulfilled.type,
    ]);
  });

  it('should fetchTargetOfferAction when server returns 400', async () => {
    const hotelId = datatype.number(100);
    const targetOffer = {};
    const nearbyOffers: OfferList = [];
    const reviews: ReviewList = [];

    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${hotelId}`).reply(400, targetOffer);
    mockAPI.onGet(`${APIRoute.Offers}/${hotelId}/nearby`).reply(400, nearbyOffers);
    mockAPI.onGet(`${APIRoute.Comments}/${hotelId}`).reply(400, reviews);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchTargetOfferAction(hotelId));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchTargetOfferAction.pending.type,
      fetchTargetOfferAction.rejected.type,
    ]);
  });

  it('should dispatch sendReviewAction when server returns 200', async () => {
    const targetId = datatype.number(100);
    const reviewData = makeFakeReviewData();
    const reviews = makeFakeReviews();

    const store = mockStore();
    mockAPI.onPost(`${APIRoute.Comments}/${targetId}`).reply(200, reviews);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(sendReviewAction({ targetId, ...reviewData }));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type,
    ]);
  });

  it('should dispatch sendReviewAction when server returns 400', async () => {
    const targetId = datatype.number(100);
    const reviewData = makeFakeReviewData();
    const reviews: ReviewList = [];

    const store = mockStore();
    mockAPI.onPost(`${APIRoute.Comments}/${targetId}`).reply(400, reviews);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(sendReviewAction({ targetId, ...reviewData }));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.rejected.type,
    ]);
  });
});
