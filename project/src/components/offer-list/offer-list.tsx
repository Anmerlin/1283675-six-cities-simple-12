import { OfferItem, OfferList } from 'types/offer';
import { OfferCard } from 'components';

type OfferListProps = {
  offers: OfferList;
  onHoverCard?: (offer: OfferItem | null) => void;
}

function Offers({ offers, onHoverCard }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} onHoverCard={onHoverCard} />)}
    </div>
  );
}

export default Offers;
