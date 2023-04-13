import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'const';
import { offersData } from './offers-data/offers-data';
import { offersList } from './offers-list/offers-list';
import { user } from './user/user';

export const rootReducer = combineReducers({
  [NameSpace.User]: user.reducer,
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.Offer]: offersList.reducer,
});
