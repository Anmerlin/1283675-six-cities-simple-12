import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeOffers } from 'utils/mocks';
import { HistoryRouter } from 'components';
import Offers from './offer-list';

const offers = makeFakeOffers();
const history = createMemoryHistory();

describe('Component: Offers', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Offers offers={offers} onHoverCard={jest.fn()} />
      </HistoryRouter>
    );

    expect(screen.getAllByTestId('cardItem').length).toBe(offers.length);
  });
});
