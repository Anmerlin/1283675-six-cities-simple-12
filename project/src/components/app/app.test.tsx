import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { createAPI } from 'services/api';
import App from './app';
import { HistoryRouter } from 'components';
import { OffersList, User, OffersData, State } from 'types/state';
import { AppRoute, AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORTING } from 'const';
import { makeFakeOffers, makeFakeReviews, makeFakeUser } from 'utils/mocks';

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

window.scrollTo = jest.fn();
Element.prototype.scrollTo = jest.fn();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Component: App - Application routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  it('should render "OfferScreen" when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.OfferById);

    mockDataState.offer.isInitial = true;

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByRole('heading').textContent).toBe('Sign in');
    expect(screen.getByRole('button').textContent).toBe('Sign in');
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });


  it('should render "PageNotFound" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
});
