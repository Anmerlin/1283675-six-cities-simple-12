import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { createAPI } from 'services/api';
import { OffersData, State } from 'types/state';
import { makeFakeOffers, makeFakeReviews } from 'utils/mocks';
import { AuthorizationStatus } from 'const';
import { OfferScreen } from 'pages';
import { HistoryRouter } from 'components';
import { OfferItem } from 'types/offer';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffers = makeFakeOffers();

const mockDataState: OffersData = {
  offers: {
    data: fakeOffers,
    isDataLoading: false,
  },
  offer: {
    targetOffer: fakeOffers[0] as OfferItem,
    nearbyOffers: makeFakeOffers(3),
    reviews: makeFakeReviews(),
    isInitial: false,
    isDataLoading: false,
    isError: false,
  },
  review: {
    isSending: false,
    isSendingError: false,
  }
};

const fakeStore = mockStore({
  DATA: mockDataState,
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <OfferScreen />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);

describe('Page: Offer', () => {
  it('should render LoadingScreen when no property returned', () => {
    mockDataState.offer.isInitial = false;

    render(fakeApp);

    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  it('should render Loader when loading state', () => {
    mockDataState.offer.isInitial = true;
    mockDataState.offer.isDataLoading = true;

    render(fakeApp);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render PageNotFound when no offer returned', () => {
    mockDataState.offer.isInitial = true;
    mockDataState.offer.isError = true;
    mockDataState.offer.isDataLoading = false;

    render(fakeApp);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
  });

  it('should render offer when targetOffer found', () => {
    mockDataState.offer.isInitial = true;
    mockDataState.offer.targetOffer = fakeOffers[0];
    mockDataState.offer.isError = false;
    mockDataState.offer.isDataLoading = false;

    render(fakeApp);

    expect(screen.getByText(mockDataState.offer.targetOffer.description)).toBeInTheDocument();
  });
});
