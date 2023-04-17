import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { createAPI } from 'services/api';
import { OffersList, User, OffersData, State } from 'types/state';
import { HistoryRouter } from 'components';
import { makeFakeOffers, makeFakeReviews, makeFakeUser } from 'utils/mocks';
import { AppRoute, AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORTING } from 'const';
import ScrollTop from './scroll-top';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockUserState: User = {
  authorizationStatus: AuthorizationStatus.Auth,
  userData: makeFakeUser(),
};

const fakeOffers = makeFakeOffers();

const mockDataState: OffersData = {
  offers: {
    data: fakeOffers,
    isDataLoading: false,
  },
  offer: {
    targetOffer: fakeOffers[0],
    nearbyOffers: makeFakeOffers(3),
    reviews: makeFakeReviews(),
    isInitial: false,
    isDataLoading: false,
    isError: false,
  },
  review: {
    isSending: false,
    isSendingError: false,
  },
};

const mockOfferState: OffersList = {
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING,
};

const fakeStore = mockStore({
  USER: mockUserState,
  DATA: mockDataState,
  OFFER: mockOfferState,
});

const history = createMemoryHistory();

const spyScrollTo = jest.fn();

describe('Component: ScrollTop', () => {
  beforeEach(() => {
    history.push(AppRoute.Main);

    Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
    Object.defineProperty(global.window, 'scrollY', { value: 7 });
    spyScrollTo.mockClear();

  });

  it('should calls window.scrollTo', () => {
    history.push(AppRoute.OfferById);

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <ScrollTop />
        </HistoryRouter>
      </Provider>
    );

    expect(spyScrollTo).toHaveBeenCalledWith(0, 0);
  });
});
