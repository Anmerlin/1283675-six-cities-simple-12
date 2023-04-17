import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { createAPI } from 'services/api';
import { HistoryRouter } from 'components';
import { OffersList, User, OffersData, State } from 'types/state';
import { AppRoute, AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORTING } from 'const';
import { makeFakeOffers, makeFakeReviews, makeFakeUser } from 'utils/mocks';
import Layout from './layout';

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

const FakeComponent = () => <div>Fake text</div>;

describe('Component: Layout', () => {
  it('should render "FakeComponent" when user navigate to "/" and shown "Header"', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path={AppRoute.Main} element={<FakeComponent />} />
              </Route>
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('Fake text')).toBeInTheDocument();
  });
});
