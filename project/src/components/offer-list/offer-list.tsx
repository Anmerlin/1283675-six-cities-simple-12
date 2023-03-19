import { OfferCards } from 'types/offer';
import { Offer } from 'components';

type OfferListProps = {
  offers: OfferCards;
}

function OffersList({ offers }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Offer key={offer.id} offer={offer} />)}
    </div>
  );
}

export default OffersList;
