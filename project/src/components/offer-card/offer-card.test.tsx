import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from 'utils/mocks';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'components';
import OfferCard from './offer-card';

const offer = makeFakeOffer();
const { previewImage, price, title } = offer;
const history = createMemoryHistory();

describe('Component: OfferCard', () => {
  offer.isPremium = true;
  offer.type = 'apartment';

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <OfferCard offer={offer} onHoverCard={jest.fn()} />
      </HistoryRouter>
    );

    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(/Apartment/i)).toBeInTheDocument();
    expect(screen.getByAltText(/place/i)).toHaveAttribute('src', previewImage);
  });
});
