import { useState } from 'react';
import { OfferCard, OfferCards } from '../../types/offer';
import Card from '../card/card';

type OfferListProps = {
  offers: OfferCards;
}

function OffersList({ offers }: OfferListProps): JSX.Element {
  const [, setActiveCard] = useState<OfferCard | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} setActiveCard={setActiveCard} />)}
    </div>
  );
}

export default OffersList;
