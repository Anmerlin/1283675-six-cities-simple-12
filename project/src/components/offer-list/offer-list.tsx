import { OfferCards, OfferCard } from 'types/offer';
import { Offer } from 'components';

type OfferListProps = {
  offers: OfferCards;
  setActive?: (data: OfferCard | null) => void;
}

function OffersList({ offers, setActive }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Offer key={offer.id} offer={offer} selectOffer={setActive} />)}
    </div>
  );
}

export default OffersList;
