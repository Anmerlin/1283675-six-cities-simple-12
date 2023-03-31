import { plural } from 'const';
import { getSelectedCity, getOffers } from 'store/selectors';
import { useAppSelector } from 'hooks';
import { SortingForm, Offers, Map } from 'components';

function getTextByCount(count: number, city: string): string {
  const pluralRules = plural.select(count);
  switch (pluralRules) {
    case 'one':
      return `${count} place to stay in ${city}`;
    default:
      return `${count} places to stay in ${city}`;
  }
}

function MainContent(): JSX.Element {
  const selectedCity = useAppSelector(getSelectedCity);
  const offers = useAppSelector(getOffers);

  const placesFoundText = getTextByCount(offers.length, selectedCity);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{placesFoundText}</b>

        <SortingForm />

        <Offers offers={offers} />

      </section>
      <div className="cities__right-section">
        <Map
          city={offers[0].city}
          offers={offers}
          className={'cities__map'}
        />
      </div>
    </div>
  );
}

export default MainContent;
