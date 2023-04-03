import { plural } from 'const';
import { getSelectedCity, getOffersDataLoading } from 'store/selectors';
import { useAppSelector } from 'hooks';
import { Loader, SortingForm, Offers, Map } from 'components';

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
  const isOffersDataLoading = useAppSelector(getOffersDataLoading);
  // спросить
  const offers = useAppSelector((state) =>
    state.offers
      .filter(({ city }) => city.name === selectedCity)
      .sort((a, b) => {
        switch (state.selectedSorting) {
          case 'Price: high to low':
            return b.price - a.price;
          case 'Price: low to high':
            return a.price - b.price;
          case 'Top rated first':
            return b.rating - a.rating;
          default:
            return 0;
        }
      })
  );

  const placesFoundText = getTextByCount(offers.length, selectedCity);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{placesFoundText}</b>

        <SortingForm />

        {isOffersDataLoading ? <Loader /> : <Offers offers={offers} />}

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
