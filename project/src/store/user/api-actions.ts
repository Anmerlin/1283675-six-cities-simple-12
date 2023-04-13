import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Token from 'services/token';
import { AppDispatch } from 'types/state';
import { redirectToRoute } from 'store/actions';
import { AuthData } from 'types/auth-data';
import { UserData } from 'types/user-data';
import { APIRoute, AppRoute } from 'const';

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  { extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);

  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    Token.save(data.token);
    dispatch(redirectToRoute(AppRoute.Main));

    return data;
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  Token.drop();
});
