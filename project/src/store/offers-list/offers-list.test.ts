import { sortingOptions } from 'const';
import { makeFakeCity } from 'utils/mocks';
import { initialState, offersList, changeCity, selectSorting } from './offers-list';
import { SortingIds } from 'types/sorting';

const city = makeFakeCity();
const sortingKeys = Object.keys(sortingOptions) as Array<SortingIds>;
const sorting = sortingOptions[sortingKeys[Math.floor(Math.random() * sortingKeys.length)]];

describe('Reducer: offersList', () => {
  it('without additional parameters should return initial state', () => {
    expect(
      offersList.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  it('should set new city', () => {
    expect(
      offersList.reducer(initialState, changeCity({ targetCity: city.name }))
    ).toEqual({ ...initialState, city: city.name });
  });

  it('should set new sorting', () => {
    expect(
      offersList.reducer(
        initialState,
        selectSorting({ targetSorting: sorting })
      )
    ).toEqual({ ...initialState, sorting });
  });
});
