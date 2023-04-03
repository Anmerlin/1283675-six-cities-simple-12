import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from 'types/state';
import { loadOffers, setOffersDataLoadingStatus } from './action';
import { APIRoute } from 'const';
import { OfferCards } from 'types/offer';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  // проверка будет реализована в дальнейшем
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<OfferCards>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(loadOffers(data));
});
