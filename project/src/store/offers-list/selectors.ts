import { NameSpace } from 'const';
import { OffersList, State } from 'types/state';

export const getSelectedCity = (state: State): OffersList['city'] => state[NameSpace.Offer].city;
export const getSelectedSorting = (state: State): OffersList['sorting'] => state[NameSpace.Offer].sorting;
