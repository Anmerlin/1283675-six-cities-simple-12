import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { makeFakeCity, makeFakeOffers } from 'utils/mocks';
import Map from './map';

const city = makeFakeCity();
const offers = makeFakeOffers();
const selectedOffer = offers[0];
const className = datatype.string();

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Map
        offers={offers}
        selectedOffer={selectedOffer}
        city={city}
        className={className}
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
    screen.getByTestId('map').classList.contains(className);
  });
});
