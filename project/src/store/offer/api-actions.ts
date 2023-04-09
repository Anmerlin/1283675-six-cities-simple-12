import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from 'types/state';
import { loadOffers, setDataLoadingStatus, loadTargetOffer, loadNearbyOffers, loadReviews } from './action';
import { APIRoute } from 'const';
import { OfferCards, OfferCard } from 'types/offer';
import { ReviewOfferCards, ReviewData } from 'types/review';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const { data } = await api.get<OfferCards>(APIRoute.Offers);
  dispatch(loadOffers(data));
  dispatch(setDataLoadingStatus(false));
});

// !! Уточнить про setDataLoadingStatus и initialDataLoading, так как setDataLoadingStatus сейчас используется в разных санках и с набором разных данных

export const fetchTargetOfferAction = createAsyncThunk<
  void,
  OfferCard['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchTargetOffer', async (hotelId, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const [offer, nearby, comments] = await Promise.all([
    api.get<OfferCard>(`${APIRoute.Offers}/${hotelId}`),
    api.get<OfferCards>(`${APIRoute.Offers}/${hotelId}/nearby`),
    api.get<ReviewOfferCards>(`${APIRoute.Comments}/${hotelId}`),
  ]);
  dispatch(loadTargetOffer(offer.data));
  dispatch(loadNearbyOffers(nearby.data));
  dispatch(loadReviews(comments.data));
  dispatch(setDataLoadingStatus(false));
});

export const sendReviewAction = createAsyncThunk<
  void,
  {
    targetId: OfferCard['id'];
    review: ReviewData['review'];
    rating: ReviewData['rating'];
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/sendReview',
  async (
    { review: comment, rating, targetId: hotelId },
    { dispatch, extra: api }
  ) => {
    const { data } = await api.post<ReviewOfferCards>(
      `${APIRoute.Comments}/${hotelId}`,
      { comment, rating }
    );
    dispatch(loadReviews(data));
  }
);
