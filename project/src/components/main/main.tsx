import { useState } from 'react';
import { OfferCards, OfferCard } from 'types/offer';
import { Offers, Map, City } from 'components';

type MainProps = {
  rentalOffersCount: number;
  offers: OfferCards;
}

function MainContent({ rentalOffersCount, offers }: MainProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<OfferCard | null>(null);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <City />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{rentalOffersCount} places to stay in Amsterdam</b>
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

            <Offers offers={offers} setActive={setActiveCard} />

          </section>
          <div className="cities__right-section">
            <Map
              city={offers[0].city}
              offers={offers}
              selectedOffer={activeCard}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
