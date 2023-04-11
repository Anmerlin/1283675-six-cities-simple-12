import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from 'const';
import { OfferList, OfferItem } from 'types/offer';
import { ReviewList, ReviewData } from 'types/review';

export const fetchOffersAction = createAsyncThunk<
  OfferList,
  undefined,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferList>(APIRoute.Offers);
  return data;
});

export const fetchTargetOfferAction = createAsyncThunk<
  [OfferItem, OfferList, ReviewList],
  OfferItem['id'],
  { extra: AxiosInstance }
>('data/fetchTargetOffer', async (hotelId, { extra: api }) => {
  const [offer, nearbyOffers, comments] = await Promise.all([
    api.get<OfferItem>(`${APIRoute.Offers}/${hotelId}`),
    api.get<OfferList>(`${APIRoute.Offers}/${hotelId}/nearby`),
    api.get<ReviewList>(`${APIRoute.Comments}/${hotelId}`),
  ]);

  return [offer.data, nearbyOffers.data, comments.data];
});

export const sendReviewAction = createAsyncThunk<
  ReviewList,
  {
    targetId: OfferItem['id'];
    review: ReviewData['review'];
    rating: ReviewData['rating'];
  },
  { extra: AxiosInstance }
>(
  'data/sendReview',
  async ({ review: comment, rating, targetId: hotelId }, { extra: api }) => {
    const { data } = await api.post<ReviewList>(
      `${APIRoute.Comments}/${hotelId}`,
      { comment, rating }
    );

    return data;
  }
);
