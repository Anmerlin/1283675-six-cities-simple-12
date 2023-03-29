import { useState } from 'react';
import { OfferCard } from 'types/offer';
import { useAppSelector } from 'hooks';
import { SortingForm, Offers, Map } from 'components';

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

        <SortingForm />

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
