import { OfferItem, OfferList } from 'types/offer';
import { OfferCard } from 'components';

type OfferListProps = {
  offers: OfferList;
  handleCardHover?: (offer: OfferItem | null) => void;
}

function Offers({ offers, handleCardHover }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} handleCardHover={handleCardHover} />)}
    </div>
  );
}

export default Offers;
