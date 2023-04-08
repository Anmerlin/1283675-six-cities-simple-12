import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from 'types/state';
import { redirectToRoute, setUserData, setLogout} from './action';
import Token from 'services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from 'const';
import { AuthData } from 'types/auth-data';
import { UserData } from 'types/user-data';

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(setUserData(data));
  } catch {
    dispatch(setLogout(AuthorizationStatus.NoAuth)); // спросить
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    Token.save(data.token);
    dispatch(setUserData(data));
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  Token.drop();
  dispatch(setLogout(AuthorizationStatus.NoAuth)); //!! спросить
});
