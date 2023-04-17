import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { makeFakeOffer, makeFakeOffers, makeFakeReviews } from 'utils/mocks';
import { AuthorizationStatus } from 'const';
import { HistoryRouter } from 'components';
import Offer from './offer';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeStore = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

const targetOffer = makeFakeOffer();
const nearbyOffers = makeFakeOffers(3);
const reviews = makeFakeReviews();

const {
  description,
  host,
  price,
  title,
} = targetOffer;


describe('Component: Offer', () => {
  it('should render correctly', () => {
    targetOffer.maxAdults = 1;
    targetOffer.bedrooms = 7;

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Offer
              targetOffer={targetOffer}
              nearbyOffers={nearbyOffers}
              reviews={reviews}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('7 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 1 adult')).toBeInTheDocument();
    expect(screen.getByAltText(/host avatar/i)).toHaveAttribute('src', host.avatarUrl);
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
