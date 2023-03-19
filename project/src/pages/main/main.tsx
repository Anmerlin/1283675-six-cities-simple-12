import { OfferCards } from 'types/offer';
import { Main } from 'components';

type MainScreenProps = {
  rentalOffersCount: number;
  offers: OfferCards;
}

function MainScreen({ rentalOffersCount, offers }: MainScreenProps): JSX.Element {
  return (
    <Main rentalOffersCount={rentalOffersCount} offers={offers} />
  );
}

export default MainScreen;
