import { useState } from 'react';
import { OfferCard } from 'types/offer';
import { useAppSelector } from 'hooks';
import { Offers, Map } from 'components';

function getWordByCount(count: number): string {
  const pluralRules = new Intl.PluralRules('en-US').select(count);
  switch (pluralRules) {
    case 'one':
      return 'place';
    default:
      return 'places';
  }
}

function MainContent(): JSX.Element {
  const [activeCard, setActiveCard] = useState<OfferCard | null>(null);
  const changeActive = (data: OfferCard | null) => setActiveCard(data);

  const selectedCity = useAppSelector((state) => state.selectedCity);
  const offers = useAppSelector((state) => state.offers);

  const word = getWordByCount(offers.length);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} {word} to stay in {selectedCity}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          {/* <ul className="places__options places__options--custom places__options--opened"> */}
          <ul className="places__options places__options--custom">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>

        <Offers offers={offers} setActive={changeActive} />

      </section>
      <div className="cities__right-section">
        <Map
          city={offers[0].city}
          offers={offers}
          selectedOffer={activeCard}
          className={'cities__map'}
        />
      </div>
    </div>
  );
}

export default MainContent;
