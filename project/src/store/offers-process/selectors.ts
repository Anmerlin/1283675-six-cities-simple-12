import { NameSpace } from 'const';
import { OffersProcess, State } from 'types/state';

export const getSelectedCity = (state: State): OffersProcess['city'] => state[NameSpace.Offer].city;
export const getSelectedSorting = (state: State): OffersProcess['sorting'] => state[NameSpace.Offer].sorting;
