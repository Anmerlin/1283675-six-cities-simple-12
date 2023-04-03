import { combineReducers } from '@reduxjs/toolkit';
import { offerReducer } from './offer/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  offer: offerReducer,
  user: userReducer,
});
