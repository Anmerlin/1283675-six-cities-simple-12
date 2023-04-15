import { useState, useRef, useMemo, useEffect } from 'react';
import { getSelectedCity, getSelectedSorting } from 'store/offers-list/selectors';
import { getOffers, getDataOffersLoadingStatus } from 'store/offers-data/selectors';
import { useAppSelector } from 'hooks';
import { Loader, SortingForm, Offers, Map } from 'components';
import { OfferItem } from 'types/offer';
import { DEFAULT_SORTING, plural } from 'const';

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
  const offerListWrapper = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<OfferItem | null>(null);
  const selectedCity = useAppSelector(getSelectedCity);
  const selectedSorting = useAppSelector(getSelectedSorting);
  const isLoading = useAppSelector(getDataOffersLoadingStatus);
  const offers = useAppSelector(getOffers);

  const filteredOffers = useMemo(
    () => offers.filter(({ city }) => city.name === selectedCity),
    [offers, selectedCity]
  );

  const sortedOffers = useMemo(() => {
    if (selectedSorting.value === DEFAULT_SORTING.value) {
      return filteredOffers;
    }

    return [...filteredOffers].sort((a, b) => {
      switch (selectedSorting.value) {
        case 'priceToHigh':
          return a.price - b.price;
        case 'priceToLow':
          return b.price - a.price;
        case 'rated':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [filteredOffers, selectedSorting]);

  useEffect(() => {
    offerListWrapper.current?.scrollTo(0, 0);
  }, [selectedCity]);

  const placesFoundText = getTextByCount(filteredOffers.length, selectedCity);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places" ref={offerListWrapper}>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{placesFoundText}</b>
        <SortingForm />
        {isLoading ? <Loader /> : <Offers offers={sortedOffers} onHoverCard={setActiveCard} />}
      </section>
      <div className="cities__right-section">
        <Map
          city={filteredOffers[0].city}
          offers={filteredOffers}
          selectedOffer={activeCard}
          className={'cities__map'}
        />
      </div>
    </div>
  );
}

export default MainContent;
