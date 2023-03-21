import { Dispatch, SetStateAction } from 'react';
import { OfferCards, OfferCard } from 'types/offer';
import { Offer } from 'components';

type OfferListProps = {
  offers: OfferCards;
  setActive: Dispatch<SetStateAction<OfferCard | null>>;
}

function OffersList({ offers, setActive }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Offer key={offer.id} offer={offer} setActive={setActive}/>)}
    </div>
  );
}

export default OffersList;
